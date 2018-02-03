const { spawn } = require('child_process');
const Sound = require('node-aplay');

/** @type {Sound} */
var sound = null;

var soundPlayingTimeout = null;
/** @type {boolean} */
var isPlaying = true;
function setPlaying(val) { isPlaying = val; hw.updateRelay(); }

function play() {
    console.log("playing sound");

    if (sound)
        sound.stop();

    sound = new Sound("/home/pi/RedPill/wakeup.wav");
    sound.play();
    sound.on("complete", () => {
        setPlaying(false);
    });

    setPlaying(true);

    if (soundPlayingTimeout) clearTimeout(soundPlayingTimeout);
    soundPlayingTimeout = setTimeout(() => {
        setPlaying(false);
        soundPlayingTimeout = null;
    }, 1000 * 60 * 15);
}

function stop() {
    setPlaying(false);
    if (sound) {
        sound.stop();
        sound = null;
    }
}

exports = module.exports = {
    play: play,
    stop: stop,
    get isPlaying() { return isPlaying; }
};
