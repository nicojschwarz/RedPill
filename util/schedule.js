const schedule = require('node-schedule');

job = schedule.scheduleJob("0 6 * * *", function () {
    if (callback) callback();
});
callback = null;

class MySchedule {
    setTime(time) {
        job.reschedule(time % 60 + " " + Math.floor(time / 60) + " * * *")
    }
}


exports = module.exports = new MySchedule();