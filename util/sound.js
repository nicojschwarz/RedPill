const { spawn } = require('child_process');

var hadError = { err: false };

var proc = null;

function play() {
    console.log("playing");
    proc = spawn('omxplayer', ['wakeup.mp3']);
    proc.on('exit', (code, signal) => {
        if (code !== 0)
            hadError.err = true;
        console.log(hadError);
        proc = null;
    });
    proc.stdout.on("data", console.log);
}

exports = module.exports = {};
exports.play = play;
exports.hadError = hadError;
exports.stop = function () {
    console.log("stopping sound; proc: " + proc);
    if (proc) {
        console.log(proc.stdin.write("^C"));
    }
}
