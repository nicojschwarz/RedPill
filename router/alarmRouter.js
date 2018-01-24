const hw = require('../util/hardware');
const express = require('express');

const alarmRouter = express.Router();

var alarm = { time: 900, active: false, colorFade: 'red', colorReset: 'blue' }

alarmRouter.get("/", (req, res, next) => {
    var obj = { timePretty: Math.round(time / 60) + ':' + time % 60, ttl: 'err: 404' };
    Object.assign(obj, alarm);
    res.send(obj);
});
alarmRouter.post("/", (req, res, next) => {
    if (typeof req.body.time === 'string') {
        const t = parseInt(req.body.time);
        if (t >= 0 && t < 3600)
            alarm.time = t;
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
