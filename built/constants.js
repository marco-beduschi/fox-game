"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeModal = exports.getNextPoopTime = exports.getNextDieTime = exports.getNextHungerTime = exports.NIGHT_LENGTH = exports.DAY_LENGTH = exports.SCENES = exports.RAIN_CHANCE = exports.ICONS = exports.TICK_RATE = void 0;
exports.TICK_RATE = 1000;
exports.ICONS = ["fish", "poop", "weather"];
exports.RAIN_CHANCE = 0.2;
exports.SCENES = ["day", "rain"];
exports.DAY_LENGTH = 60;
exports.NIGHT_LENGTH = 3;
exports.getNextHungerTime = function (clock) {
    return Math.floor(Math.random() * 3) + 5 + clock;
};
exports.getNextDieTime = function (clock) {
    return Math.floor(Math.random() * 2) + 3 + clock;
};
exports.getNextPoopTime = function (clock) {
    return Math.floor(Math.random() * 2) + 6 + clock;
};
exports.writeModal = function (text) {
    if (text === void 0) { text = ""; }
    document.querySelector(".modal").innerHTML = "<div class=\"modal-inner\">" + text + "</div>";
};
