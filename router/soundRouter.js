const express = require('express');
const fs = require("fs");
const sound = require('../util/sound');

const soundRouter = express.Router();



soundRouter.post("/", (req, res, next) => {
    fs.writeFileSync("/home/pi/RedPill/wakeup.wav", "");
    req.on('data', function (chunk) {
        var res = fs.appendFileSync("/home/pi/RedPill/wakeup.wav", chunk)
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

exports = module.exports = soundRouter;