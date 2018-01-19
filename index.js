"use strict"

var raspi = require('raspi');
var I2C = require('raspi-i2c').I2C;

raspi.init(() => {
    const i2c = new I2C();
    console.log(i2c.writeByteSync(0x69, 6));
});

console.log("Hello World!");

