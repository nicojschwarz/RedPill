"use strict"

const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;
 
raspi.init(() => {
  const i2c = new I2C();
  console.log(i2c.writeByteSync(0x18, 65)); // Read one byte from the device at address 18
});

console.log("Hello World!");

