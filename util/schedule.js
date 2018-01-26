const schedule = require('node-schedule');

var job = schedule.scheduleJob("0 6 * * *", function () {
    if (callback) callback();
});
var callback = null;

class MySchedule {
    setTime(time) {
        job.reschedule(time % 60 + " " + Math.floor(time / 60) + " * * *")
    }
    setCallback(cb) {
        callback = cb;
    }
}


exports = module.exports = new MySchedule();