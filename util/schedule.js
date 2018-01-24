const schedule = require('node-schedule');

class MySchedule {
    job = schedule.scheduleJob("0 6 * * *", () => {
        if (callback) callback();
    });

    callback = null;
    setTime(time) {
        job.reschedule(time % 60 + " " + Math.floor(time / 60) + " * * *")
    }
}


exports = module.exports = new MySchedule();