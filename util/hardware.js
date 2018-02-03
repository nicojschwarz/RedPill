const raspi = require('raspi');
const { I2C } = require('raspi-i2c');
const { DigitalInput, DigitalOutput } = require('raspi-gpio');
const { setInterval } = require('timers');

/** @type {I2C} */
var i2c = null;
/** @type {DigitalInput} */
var snoozeBtnPin = null;
/** @type {DigitalInput} */
var relayBtnPin = null;
/** @type {DigitalOutput} */
var relayPin = null;

var lastSnoVal = 2;
var relayBtnVal = 0;

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
}


function handleBtns() {
    var snoVal = snoozeBtnPin.value;
    if (snoVal === 1) {
        lastSnoVal = snoVal;
        if (snoVal === 1) {
            console.log("snooze button pressed");
            procedure.cancleSound();
            sound.stop();
        }
    }
    if (relayBtnVal !== relayBtnPin.value) {
        console.log("snooze button toggled");
        relayBtnVal = relayBtnPin.value;
        updateRelay();
    }
}

function updateRelay() {
    if (relayPin != null)
        relayPin.write(relayBtnVal === 1 || sound.isPlaying);
}

exports = module.exports = function () {
    raspi.init(function () {
        i2c = new I2C();
        snoozeBtnPin = new DigitalInput('GPIO21');
        relayBtnPin = new DigitalInput('GPIO20');
        relayPin = new DigitalOutput('GPIO26');
    });

    setInterval(handleBtns, 200);

    return {
        i2cWrite: i2cWrite,
        init: init,
        updateRelay: updateRelay,
    };
}