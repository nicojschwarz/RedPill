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
        setTimeout(() => hardware.sendRolloCommand("up"), 10000);
        setTimeout(() => hardware.sendRolloCommand("stop"), 10000 + time);
    }
}