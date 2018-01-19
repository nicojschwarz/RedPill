"use strict"

const hw = require('./util/hardware');
const express = require('express');        // call express
const bodyParser = require('body-parser');

const app = express();                 // define our app using express

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const tmpRouter = express.Router();

tmpRouter.get("/:cmd", (req, res, next) => {
    try {
        hw.i2cWrite(req.params.cmd);
        res.send("success");
    } catch (err) { next(err); }
});

app.use("/", tmpRouter)

app.listen(80);