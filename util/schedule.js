const nschedule = require('node-schedule');

var job = nschedule.scheduleJob("0 6 * * *", function () {
    console.log("running callback")
    if (callback) callback();
});
var callback = null;

class MySchedule {
    setTime(time) {
        console.log(time % 60 + " " + Math.floor(time / 60) + " * * *");
        job.reschedule(time % 60 + " " + Math.floor(time / 60) + " * * *")
    }
    setCallback(cb) {
        callback = cb;
    }
}


exports = module.exports = new MySchedule();