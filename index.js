"use strict"

const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;
const DigInput = require('raspi-gpio').DigitalInput;

/** @type {I2C} */
var i2c = null;
/** @type {DigInput} */
var btnPin = null;
raspi.init(() => {
    i2c = new I2C();
    i2cWrite("on");
    //btnPin = new DigInput();
});


/**
 * @param {"off"|"on"|"up"|"down"|"blue"|"green"|"red"|number} cmd 
 */
function i2cWrite(cmd) {
    if (typeof cmd === "string")
        cmd = parseCmd(cmd);
    if (typeof cmd !== "number" || cmd < 1 || cmd > 7)
        throw "I2C invalid command";

    console.log("sending " + cmd);
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



//btnPin.read();  