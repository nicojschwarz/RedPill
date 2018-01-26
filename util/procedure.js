var { setInterval } = require("timers");
var alarm = require("../router/alarmRouter");
var sound = require("./sound");
var hw = require("./hardware");

/* - OnRing:
 *   - lights on; completly dim lights; set to fadeColor
 *   - over 15min increase to max brightness
 *   - after 5min sound mp3
 *   - after 1h turn on light; reset; turn off light
 * - OnBtn:
 *   - if OnRing(running) ->  OnRing(disable mp3)
 */

class Procedure {
    constructor() {
        this.interval = null;
    }
    onRingNext(cb, ms) {
        this.interval = setInterval(cb, ms);
    }

    repeatNTime(cb, n, ms, cb2) {
        cb();
        if (n <= 0)
            cb2();
        else
            this.interval = setInterval(repeatNTime, ms, cb, n - 1, ms);
    }

    onRing() {
        onRingNext(() => {
            hw.i2cWrite("on");
            repeatNTime(() => { hw.i2cWrite("down"); }, 7, 750, () => {
                hw.i2cWrite(alarm.alarm.colorFade);
                onRingNext(() => {
                    repeatNTime(() => { hw.i2cWrite("down"); }, 7, 128571, () => {
                        onRingNext(() => {
                            sound.play();
                        }, 300000);
                        onRingNext(() => {
                            hw.i2cWrite("on");
                            repeatNTime(() => { hw.i2cWrite("down"); }, 7, 750, () => { hw.i2cWrite(alarm.alarm.colorReset); hw.i2cWrite("off"); });
                        }, 3600000);
                    });
                }, 128571)
            });
        }, 0)
    }
}

exports = module.exports = new Procedure();