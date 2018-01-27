var { setInterval } = require("timers");
var getAlarm = require("../router/alarmRouter");
console.log(getAlarm);
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


var doSound = true;
var ringDelay;
/*function ring() {
    doSound = true;
    if (ringDelay)
        ringDelay.cancel();
    ringDelay = delay(() => { hw.i2cWrite("on"); }, 0)
        .repeat(() => { hw.i2cWrite("down"); }, 750, 7)
        .delay(() => { hw.i2cWrite(alarm.alarm.colorFade); }, 750)
        .repeat(() => { hw.i2cWrite("up"); }, 128571, 7)
        .delay(() => {
            if (doSound)
                sound.play();
        }, 300000)
        .delay(() => { hw.i2cWrite("on"); }, 3600000)
        .repeat(() => { hw.i2cWrite("down"); }, 750, 7)
        .delay(() => { hw.i2cWrite(alarm.alarm.colorReset); }, 750)
        .delay(() => { hw.i2cWrite("off"); }, 750);
}*/
function ring() {
    doSound = true;
    if (ringDelay)
        ringDelay.cancel();
    ringDelay = delay(() => { hw.i2cWrite("on"); }, 0)
//        .repeat(() => { hw.i2cWrite("down"); }, 750, 7)
        .delay(() => { hw.i2cWrite(getAlarm().colorFade); }, 750)
        .repeat(() => { hw.i2cWrite("up"); }, 750, 7)
        .delay(() => {
            if (doSound)
                sound.play();
        }, 750)
        .delay(() => { hw.i2cWrite("on"); }, 3600000)
        .repeat(() => { hw.i2cWrite("down"); }, 750, 7)
        .delay(() => { hw.i2cWrite(getAlarm().colorReset); }, 750)
        .delay(() => { hw.i2cWrite("off"); }, 750);
}

function cancle() {
    if (ringDelay)
        ringDelay.cancel();
    ringDelay = null;
}

function cancleSound() {
    doSound = true;
}

exports = module.exports = { ring: ring, cancle: cancle, cancleSound: cancleSound };
