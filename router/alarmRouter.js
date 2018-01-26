const hw = require('../util/hardware');
const schedule = require('../util/schedule');
const express = require('express');


var alarm = { time: 900, active: false, colorFade: 'red', colorReset: 'blue' }

schedule.setCallback(() => {
    if (alarm.active)
        console.log("Ring Ring");
});

const alarmRouter = express.Router();
alarmRouter.get("/", (req, res, next) => {
    /*var now = new Date(),
        then = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0, 0, 0),
        diff = now.getTime() - then.getTime();
    var alarmTTL =*/
    var obj = { timePretty: Math.floor(alarm.time / 60) + ':' + alarm.time % 60, ttl: 'err: 404' };
    Object.assign(obj, alarm);
    res.send(obj);
});
alarmRouter.post("/", (req, res, next) => {
    if (typeof req.body.time === 'string') {
        const t = parseInt(req.body.time);
        if (t >= 0 && t < 3600)
            alarm.time = t;
        schedule.setTime(alarm.time);
    }
    if (typeof req.body.active === 'string')
        alarm.active = req.body.active !== "false";
    if (typeof req.body.colorReset === 'string')
        alarm.colorReset = req.body.colorReset;
    if (typeof req.body.colorFade === 'string')
        alarm.colorFade = req.body.colorFade;

    res.send("success");
    console.log(alarm);
});

exports = module.exports = alarmRouter;
