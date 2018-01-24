const { exec } = require('child_process');

var hadError = false;

function play() {
    exec('omxplayer wakeup.mp3').on('close', (code, signal) => {
        if (code !== 0)
            hadError = true;
    });    
}

exports = module.exports = {};
exports.play = play;
exports.hadError = hadError;