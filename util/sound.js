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
    console.log("stopping sound; proc: " + proc);
    if (sound) {
        sound.stop();
        sound = null;
    }
}
