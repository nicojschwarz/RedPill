const nschedule = require('node-schedule');

var job = nschedule.scheduleJob("0 6 * * *", function () {
    console.log("ring");
    if (save.alarm.active)
        procedure.ring();
});

function setTime(time) {
    console.log("Seting alarm to", time % 60 + " " + Math.floor(time / 60) + " * * *");
    job.reschedule(time % 60 + " " + Math.floor(time / 60) + " * * *")
}


exports = module.exports = { setTime: setTime };