"use strict"

const hw = require('./util/hardware');
const express = require('express');        // call express
const bodyParser = require('body-parser');  // 

const app = express();                 // define our app using express

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const alarmRouter = express.Router();

alarmRouter.get("/", (req, res, next) => {
    try {
        hw.i2cWrite(req.params.cmd);
        res.send("success");
    } catch (err) { next(err); }
});
alarmRouter.post("/", (req, res, next) => {
    if (typeof req.data.time === 'string') {
        const t = parseInt(req.data.time);
        if (t >= 0 && t < 3600)
            save(t);
    }
    if (typeof req.data.enabled !== 'undefined') {
        if (req.data.enabled && req.data.enabled !== 'false')
            save(true);
        else
            save(false);
    }
    if (typeof req.data.colorReset !== 'undefined') {
        if (req.data.enabled && req.data.enabled !== 'false')
            save(true);
        else
            save(false);
    }
    if (typeof req.data.colorFade !== 'undefined') {
        if (req.data.enabled && req.data.enabled !== 'false')
            save(true);
        else
            save(false);
    }
    colorReset: "white",
        spotifyPlaylistURL: ""
    res.send("success");
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