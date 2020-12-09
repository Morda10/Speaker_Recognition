const express = require("express");
const {spawn} = require('child_process');
const router = express.Router();



router.post("/", async (req, res) => {
  try {
  
    if (!req.files) {
      res.send({
        status: false,
        message: "No files",
      });
    } else {
      const { file } = req.files;

      // add func to sort files to correct dirs
      file.mv("./uploads/" + file.name);


      res.send({
        status: true,
        message: "File is uploaded",
      });
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

router.post("/python", async (req, res) => {
  var dataToSend;
  const python = spawn("python", ["./python/python.py","node.js","python"]);
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
    console.log(dataToSend)
   });
   
   python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend)
    });
  
});




module.exports = router;
