import { DigitalOutput } from './C:/Users/HP/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/raspi-gpio';
import { relative } from 'path';

"use strict"

const { setInterval } = require('timers');
const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;
const { DigitalInput, DigitalOutput } = require('raspi-gpio');

/** @type {I2C} */
var i2c = null;
/** @type {DigitalInput} */
var snoozeBtnPin = null;
/** @type {DigitalInput} */
var relayBtnPin = null;
/** @type {DigitalOutput} */
var relayPin = null;

raspi.init(function () {
    i2c = new I2C();
    snoozeBtnPin = new DigitalInput({ pin: 'GPIO21', pullResistor: require("raspi-gpio").PULL_DOWN });
    relayBtnPin = new DigitalInput({ pin: 'GPIO20', pullResistor: require("raspi-gpio").PULL_DOWN });
    relayPin = new DigitalOutput('GPIO26');
});



/**
 * @param {"off"|"on"|"up"|"down"|"blue"|"green"|"red"|number} cmd 
 */
function i2cWrite(cmd) {
    if (typeof cmd === "string")
        cmd = parseCmd(cmd);
    if (typeof cmd !== "number" || cmd < 1 || cmd > 7)
        throw "I2C invalid command";

    if (i2c != null)
        i2c.writeByte(69, cmd);
}

/**
 * @param {"off"|"on"|"up"|"down"|"blue"|"green"|"red"} cmd 
 */
function parseCmd(cmd) {
    var result = {
        off: 1,
        on: 2,
        up: 3,
        down: 4,
        blue: 5,
        green: 6,
        red: 7
    }[cmd];
    if (!result)
        throw "Invalid i2c command";
    return result;
}

var relayBtnVal = 0;
var playingSound = 0;
updateRelay = function (val = null) {
    if (val !== null)
        playingSound = val;
    relayPin.write(relayBtnVal === 1 || playingSound === 1);
};

var btnCB = null;

var exports = module.exports = {};
exports.i2cWrite = i2cWrite;
exports.setPlayingSound = function (val) {
    playingSound = val;
};
exports.setBtnCallback = function (cb) {
    btnCB = cb;
};
exports.init = function () {
    var lastSnoVal = 2;
    setInterval(function () {
        if (lastSnoVal === 0 && snoozeBtnPin.value === 1) {
            btnCB();
        }
        lastSnoVal = snoozeBtnPin.value;
        if (relayBtnVal !== relayBtnPin.value) {
            relayBtnVal = relayBtnPin.value;
            updateRelay();
        }
    }, 200);
};
exports.updateRelay = updateRelay;