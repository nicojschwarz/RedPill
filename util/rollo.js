module.exports = {
    open: function () {
        hardware.sendRolloCommand("up");
    },
    close: function () {
        hardware.sendRolloCommand("down");
    },
    openHalf: function (time) {
        if (typeof(time) !== "number" || time < 600)
            return;
        hardware.sendRolloCommand("down");
        setTimeout(() => hardware.sendRolloCommand("up"), 10000);
        setTimeout(() => hardware.sendRolloCommand("stop"), 10000 + time);
    }
}