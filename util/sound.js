const { spawn } = require('child_process');

var hadError = { err: false };

var proc = null;

function play() {
    proc = spawn('omxplayer wakeup.mp3').on('close', (code, signal) => {
        if (code !== 0)
            hadError.err = true;
        console.log(hadError);
        proc = null;
    });
}

exports = module.exports = {};
exports.play = play;
exports.hadError = hadError;
exports.stop = function () {
    console.log("stopping sound; proc: " + proc);
    if (proc) {
        console.log(proc.kill());
    }
}