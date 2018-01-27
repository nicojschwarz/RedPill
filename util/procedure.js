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

function delay(fn, t) {
    // private instance variables
    var queue = [],
        self,
        timer;

    function schedule(fn, t) {
        timer = setTimeout(function () {
            timer = null;
            fn();
            if (queue.length) {
                var item = queue.shift();
                schedule(item.fn, item.t);
            }
        }, t);
    }
    self = {
        delay: function (fn, t) {
            // if already queuing things or running a timer, 
            //   then just add to the queue
            if (queue.length || timer) {
                queue.push({ fn: fn, t: t });
            } else {
                // no queue or timer yet, so schedule the timer
                schedule(fn, t);
            }
            return self;
        },
        repeat: function (fn, t, n) {
            if (!queue.length && !timer) {
                n--;
                schedule(fn, t);
            }
            for (let i = 0; i < n; i++) {
                queue.push({ fn: fn, t: t });
            }
            return self;
        },
        cancel: function () {
            clearTimeout(timer);
            queue = [];
            return self;
        }
    };
    return self.delay(fn, t);
}


var d = delay(() => { console.log("1"); }, 500)
    .delay(() => { console.log("2"); }, 700)
    .delay(() => { console.log("3"); }, 600)
    .repeat(() => { console.log("4"); }, 1000, 5);

class Procedure {
    constructor() {
        this.interval = null;
    }

    onRing() {
        return delay(() => { hw.i2cWrite("on"); }, 0)
            .repeat(() => { hw.i2cWrite("down"); }, 750, 7)
            .delay(() => { hw.i2cWrite(alarm.alarm.colorFade); }, 750)
            .repeat(() => { hw.i2cWrite("up"); }, 128571, 7)
            .delay(() => { sound.play(); }, 300000)
            .delay(() => { hw.i2cWrite("on"); }, 3600000)
            .repeat(() => { hw.i2cWrite("down"); }, 750, 7)
            .delay(() => { hw.i2cWrite(alarm.alarm.colorReset); }, 750)
            .delay(() => { hw.i2cWrite("off"); }, 750);
        hw.i2cWrite(alarm.alarm.colorFade);
        this.onRingNext(() => {
            hw.i2cWrite("on");
            this.repeatNTime(() => { hw.i2cWrite("down"); }, 7, 750, () => {
                console.log("done");
                hw.i2cWrite(alarm.alarm.colorFade);
                this.onRingNext(() => {
                    this.repeatNTime(() => { hw.i2cWrite("down"); }, 7, 128571, () => {
                        this.onRingNext(() => {

                        }, 300000);
                        this.onRingNext(() => {

                            this.repeatNTime(() => { hw.i2cWrite("down"); }, 7, 750, () => { hw.i2cWrite("off"); });
                        }, 3600000);
                    });
                }, 128571)
            });
        }, 0)
    }
}

exports = module.exports = new Procedure();