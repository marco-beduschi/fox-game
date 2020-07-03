"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.togglePoopBag = exports.modScene = exports.modFox = void 0;
function modFox(state) {
    document.querySelector(".fox").className = "fox fox-" + state;
}
exports.modFox = modFox;
function modScene(state) {
    document.querySelector(".game").className = "game " + state;
}
exports.modScene = modScene;
function togglePoopBag(show) {
    document.querySelector(".poop-bag").classList.toggle("hidden", !show);
}
exports.togglePoopBag = togglePoopBag;
