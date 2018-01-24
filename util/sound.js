const { exec } = require('child_process');

var hadError = { err: false };

function play() {
    exec('omxplayer wakeup.mp3').on('close', (code, signal) => {
        if (code !== 0)
            hadError.err = true;
        console.log(hadError);
    });
}

exports = module.exports = {};
exports.play = play;
exports.hadError = hadError;