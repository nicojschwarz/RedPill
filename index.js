"use strict"

const express = require('express');        // call express
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();                 // define our app using express

//app.use(fileUpload());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(function (req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function (chunk) {
        req.rawBody += chunk;
    });

    req.on('end', function () {
        next();
    });
});
app.use(bodyParser.raw());

app.use("/led", require('./router/ledRouter'));
app.use("/alarm", require('./router/alarmRouter'));
app.use("/sound", require('./router/soundRouter'));

app.listen(80);