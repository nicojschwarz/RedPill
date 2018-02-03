const express = require('express');
const fs = require("fs");

var alarm;
try {
    alarm = require("../alarm.json")
} catch (err) {
    alarm = { time: 900, active: false, colorFade: 'red', colorReset: 'blue' };
}
function save() {
    fs.writeFile("alarm.json", JSON.stringify(alarm), "utf8", (err) => { if (err) console.log("alarm save err: " + err); });
}


procedure.setGetAlarm(() => { return alarm; });

schedule.setCallback(() => {
    console.log("ring");
    if (alarm.active)
        procedure.ring();
});
hw.setBtnCallback(() => {
    console.log("button press recived");
    procedure.cancleSound();
    sound.stop();
});

const alarmRouter = express.Router();

alarmRouter.get("/", (req, res, next) => {
    var d = new Date(),
        timeInDay = d.getMinutes() + d.getHours() * 60,
        deltaTime = alarm.time - timeInDay,
        alarmTTL = (deltaTime < 0) ? deltaTime + 1440 : deltaTime,
        ttl = Math.floor(alarmTTL / 60) + 'h and ' + alarmTTL % 60 + "min",
        timePretty = Math.floor(alarm.time / 60) + ':' + alarm.time % 60;
    res.send({
        time: alarm.time,
        active: alarm.active,
        colorFade: alarm.colorFade,
        colorReset: alarm.colorReset,
        timePretty: timePretty,
        ttl: ttl
    });
});
alarmRouter.post("/", (req, res, next) => {
    if (typeof req.body.time === 'string') {
        const t = parseInt(req.body.time);
        if (t >= 0 && t < 1440)
            alarm.time = t;
        schedule.setTime(alarm.time);
        console.log(alarm.time);
    }
    if (typeof req.body.active === 'string')
        alarm.active = req.body.active !== "false";
    if (typeof req.body.colorReset === 'string')
        alarm.colorReset = req.body.colorReset;
    if (typeof req.body.colorFade === 'string')
        alarm.colorFade = req.body.colorFade;

    save();
    res.send("success");
    console.log(alarm);
});

alarmRouter.get("/abort", (req, res, next) => {
    procedure.cancle();
    res.send("success");
});

exports = module.exports = alarmRouter;