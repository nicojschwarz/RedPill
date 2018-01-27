const { spawn } = require('child_process');
const Sound = require('node-aplay');

/** @type {Sound} */
var sound = null;

function play() {
    console.log("playing");
    if(sound)
        sound.stop();
    sound = new Sound("wakeup.wav");
    sound.play();
}

exports = module.exports = {};
exports.play = play;
exports.stop = function () {
    if (sound) {
        sound.stop();
        sound = null;
    }
}
