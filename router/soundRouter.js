const express = require('express');
const fs = require("fs");
const sound = require('../util/sound');

const soundRouter = express.Router();

soundRouter.post("/", (req, res, next) => {
    fs.writeFileSync("./wakeup.mp3", "");
    req.on('data', function (chunk) {
        if (!fs.appendFileSync("./wakeup.mp3", chunk)) {
            console.log("error uploading file");
            res.send("error writing file");
        }
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