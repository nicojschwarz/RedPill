"use strict"

const express = require('express');        // call express
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();                 // define our app using express

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/led", require('./router/ledRouter'));
app.use("/alarm", require('./router/alarmRouter'));

app.listen(80);