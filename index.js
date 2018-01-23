"use strict"

const hw = require('./util/hardware');
const express = require('express');        // call express
const bodyParser = require('body-parser');  // 

const app = express();                 // define our app using express

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const alarmRouter = express.Router();

var alarm = { time: 900, active: false, colorFade: 'red', colorReset: 'blue' }

alarmRouter.get("/", (req, res, next) => {
    try {
        hw.i2cWrite(req.params.cmd);
        res.send("success");
    } catch (err) { next(err); }
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

const ledRouter = express.Router();
ledRouter.get("/:cmd", (req, res, next) => {
    try {
        hw.i2cWrite(req.params.cmd);
        res.send("success");
    } catch (err) { next(err); }
});

app.use("/led", ledRouter);
app.use("/alarm", alarmRouter);

app.listen(80);