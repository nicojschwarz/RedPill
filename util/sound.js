const { spawn } = require('child_process');
const Sound = require('node-aplay');

var hadError = { err: false };

/** @type {Sound} */
var sound = null;

function play() {
    console.log("playing");
    sound = new Sound("wakeup.wav");
    sound.play();
}

exports = module.exports = {};
exports.play = play;
exports.hadError = hadError;
exports.stop = function () {
    if (sound) {
        sound.stop();
        sound = null;
    }
}
