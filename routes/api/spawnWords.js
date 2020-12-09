const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const randomWords = require('random-words');

router.get("/getRandWords", async (req, res) => {
  try {
    const words = randomWords(5);
    res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
