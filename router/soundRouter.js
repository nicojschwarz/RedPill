const express = require('express');
const fs = require("fs");
const sound = require('../util/sound');

const soundRouter = express.Router();

soundRouter.post("/", (req, res, next) => {
    fs.writeFile("./wakeup.mp3", "");
    req.on('data', function (chunk) {
        fs.appendFile("./wakeup.mp3", chunk);
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