const express = require('express');
const fs = require("fs");
const sound = require('../util/sound');

const soundRouter = express.Router();



soundRouter.post("/", (req, res, next) => {
    fs.writeFileSync("./wakeup.mp3", "");
    req.on('data', function (chunk) {
        var res = fs.appendFileSync("./wakeup.mp3", chunk)
        if (res)
            console.log(res);
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