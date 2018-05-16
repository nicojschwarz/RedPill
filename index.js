"use strict"

const express = require('express');        // call express
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

global.hw = require('./util/hardware')();
global.sound = require('./util/sound');
global.procedure = require('./util/procedure');
global.schedule = require('./util/schedule');
global.save = require('./util/save');
global.rollo = require('./util/rollo');

save.load();

const app = express();                 // define our app using express

app.use("/sound", require('./router/soundRouter'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/led", require('./router/ledRouter'));
app.use("/alarm", require('./router/alarmRouter'));

app.listen(80);
