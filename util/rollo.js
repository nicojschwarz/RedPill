module.exports = {
    open: function () {
        hw.sendRolloCommand("up");
    },
    close: function () {
        hw.sendRolloCommand("down");
    },
    openHalf: function (time) {
        if (typeof(time) !== "number" || time < 600)
            return;
        hw.sendRolloCommand("down");
        setTimeout(() => hw.sendRolloCommand("up"), 20000);
        setTimeout(() => hw.sendRolloCommand("stop"), 20000 + time);
    }
}