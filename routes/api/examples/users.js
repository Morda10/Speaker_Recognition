const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Yup = require("yup");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
env.config();

const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("password is required"),
  repass: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("Enter password again")
    .oneOf([Yup.ref("password"), null], "Password doesnt match"),
  trainer: Yup.string().required("Must have someone to train you"),
});

const validationSchema2 = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("password is required"),
  repass: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("Enter password again")
    .oneOf([Yup.ref("password"), null], "Password doesnt match"),
});

//get all users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("error");
  }
});

//register new trainee
router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const trainerID = req.body.trainer;
  try {
    await validationSchema.validate(req.body, { abortEarly: false });
    console.log(req.body);
    let user = await User.findOne({ email });
    let trainer = await User.findById(trainerID);
    if (!trainer) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Trainer doesnt exists" }] });
    }
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const newUser = new User({
      name: req.body.name,
      email,
      password,
      trainer: trainerID,
    });

    trainer.trainees.push(newUser._id);

    const salt = await bcrypt.genSalt(10);

    console.log(newUser);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    await trainer.save();
    return res.status(200).json("Trainee added successfully");
  } catch (error) {
    console.log(error);
  }
});

//register new trainer
router.post("/newTrainer", async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const rank = 1;

  try {
    await validationSchema2.validate(req.body, { abortEarly: false });
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const newUser = new User({
      name: req.body.name,
      email,
      password,
      rank,
    });

    const salt = await bcrypt.genSalt(10);

    console.log(newUser);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    return res.status(200).json("Trainer added successfully");
  } catch (error) {
    console.log(error);
  }
});

//delete user by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json("error");
    }
    return res.status(200).json("ss");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
