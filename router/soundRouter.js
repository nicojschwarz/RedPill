const express = require('express');
const fs = require("fs");

const soundRouter = express.Router();

soundRouter.post("/", (req, res, next) => {
    // jank but works with MIT app inventor
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
    console.log("trying to play");
    sound.play();
    res.send('success');
});
soundRouter.get("/abort", (req, res, next) => {
    sound.stop();
    res.send('success');
});

exports = module.exports = soundRouter;
