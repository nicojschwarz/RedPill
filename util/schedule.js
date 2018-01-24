const schedule = require('node-schedule');

const job = schedule.scheduleJob("20 * * * *", ()=>{
    console.log("Go");
});

exports = module.exports = {};