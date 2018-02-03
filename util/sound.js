const { spawn } = require('child_process');
const Sound = require('node-aplay');

/** @type {Sound} */
var sound = null;

var soundPlayingTimeout = null;

function play() {
    console.log("playing");
    if (sound)
        sound.stop();
    sound = new Sound("/home/pi/RedPill/wakeup.wav");
    sound.play();
    sound.on("complete", () => {
        hw.updateRelay(0);
    });

    hw.updateRelay(1);

    if (soundPlayingTimeout)
        clearTimeout(soundPlayingTimeout);
    soundPlayingTimeout = setTimeout(() => {
        hw.updateRelay(0);
        soundPlayingTimeout = null;
    }, 1000 * 60 * 15);
}

exports = module.exports = {};
exports.play = play;
exports.stop = function () {
    hw.updateRelay(0);
    if (sound) {
        sound.stop();
        sound = null;
    }
}
