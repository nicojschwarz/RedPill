"use strict"

const hw = require('./util/hardware')

function test(i) {
    hw.i2cWrite(i);
    if (i < 7)
        setTimeout(test, 2000, i + 1);
}
setTimeout(() => {
    test(1);
}, 1000);