const express = require('express');

const alarmRouter = express.Router();

alarmRouter.get("/", (req, res, next) => {
    var d = new Date(),
        timeInDay = d.getMinutes() + d.getHours() * 60,
        deltaTime = save.alarm.time - timeInDay,
        alarmTTL = (deltaTime < 0) ? deltaTime + 1440 : deltaTime,
        ttl = Math.floor(alarmTTL / 60) + 'h and ' + alarmTTL % 60 + "min",
        timePretty = Math.floor(save.alarm.time / 60) + ':' + save.alarm.time % 60;
    res.send({
        time: save.alarm.time,
        active: save.alarm.active,
        colorFade: save.alarm.colorFade,
        colorReset: save.alarm.colorReset,
        timePretty: timePretty,
        ttl: ttl
    });
});
alarmRouter.post("/", (req, res, next) => {
    if (typeof req.body.time === 'string') {
        var t = parseInt(req.body.time);
        if (t >= 0 && t < 1440) {
            t -= 20;
            if (t<0) t += 1440;
            save.alarm.time = t; }
        schedule.setTime(save.alarm.time);
        console.log(save.alarm.time);
    }
    if (typeof req.body.active === 'string')
        save.alarm.active = req.body.active !== "false";
    if (typeof req.body.colorReset === 'string')
        save.alarm.colorReset = req.body.colorReset;
    if (typeof req.body.colorFade === 'string')
        save.alarm.colorFade = req.body.colorFade;

    save.save();
    res.send("success");
    console.log("alarm set: " + save.alarm);
});

alarmRouter.get("/abort", (req, res, next) => {
    procedure.cancle();
    sound.stop();
    res.send("success");
});

alarmRouter.get("/rollo/up", (req, res, next) => {
    rollo.open();
    res.send("success");
});
alarmRouter.get("/rollo/down", (req, res, next) => {
    rollo.close();
    res.send("success");
});
alarmRouter.get("/rollo/half/:time", (req, res, next) => {
    rollo.openHalf(req.params.time);
    res.send("success");
});

exports = module.exports = alarmRouter;
