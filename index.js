"use strict"

const express = require('express');        // call express
const bodyParser = require('body-parser');  // 

const app = express();                 // define our app using express

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const alarmRouter = express.Router();

alarmRouter.post("/", (req, res, next) => {
    console.log(req.data);
    res.send("success");
});

app.use("/alarm", alarmRouter);

app.listen(80);