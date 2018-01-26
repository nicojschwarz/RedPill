var { setInterval } = require("timers");


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
        this.onRingInterval = null;
        this.onBtnInterval = null;
    }
    onRingNext(cb, ms) {
        this.onRingInterval = setInterval(cb, ms);
    }

    onRing() {
        onRingNext(() => { })
    }
}
