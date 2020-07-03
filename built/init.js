"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameState_ts_1 = require("./gameState.ts");
var constants_ts_1 = require("./constants.ts");
var buttons_ts_1 = require("./buttons.ts");
function init() {
  console.log("starting game");
  buttons_ts_1.default(gameState_ts_1.handleUserAction);
  var nextTimeToTick = Date.now();
  // :eyes: Clojure!
  function nextAnimationFrame() {
    var now = Date.now();
    if (nextTimeToTick <= now) {
      gameState_ts_1.default.tick();
      nextTimeToTick = now + constants_ts_1.TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame);
  }
  requestAnimationFrame(nextAnimationFrame);
}
init();
