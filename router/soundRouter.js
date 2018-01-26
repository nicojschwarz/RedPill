const express = require('express');
const fs = require("fs");
const sound = require('../util/sound');

const soundRouter = express.Router();

soundRouter.post("/", (req, res, next) => {
    fs.writeFile("./wakeup.mp3", "", (err) => {
        console.log("error");
        res.send("error writing file");
    });
    req.on('data', function (chunk) {
        fs.appendFile("./wakeup.mp3", chunk, (err) => {
            console.log("error uploading file");
            res.send("error writing file");
        });
    });
    req.on("end", () => {
        res.send("success");
        console.log("finished uploading file");
    });
});

soundRouter.get("/play", (req, res, next) => {
    sound.play();
    res.send('success');
});

soundRouter.get("/err", (req, res, next) => {
    console.log(sound);
    res.send(sound.hadError);
});

exports = module.exports = soundRouter;