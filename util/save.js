const fs = require("fs");

var alarm;

function load() {
    try {
        alarm = require("../alarm.json")
    } catch (err) {
        if (!alarm)
            alarm = { time: 900, active: false, colorFade: 'red', colorReset: 'blue', rolloHalf: 6000 };
    }
}

function save() {
    fs.writeFile("alarm.json", JSON.stringify(alarm), "utf8", (err) => {
        if (err) console.log("alarm save err: " + err);
    });
}

exports = module.exports = {
    save: save,
    load: load,
    get alarm() {
        return alarm;
    },
    set alarm(val) {
        alarm = val;
        save(alarm);
    }
};