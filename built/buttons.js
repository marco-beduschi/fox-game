"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var toggleHightlighted = function (iconIndex, show) {
    document
        .querySelector("." + constants_1.ICONS[iconIndex] + "-icon")
        .classList.toggle("highlighted", show);
};
function initButtons(handleUserAction) {
    var selectedIcon = 0;
    function buttonClick(_a) {
        var target = _a.target;
        if (target.classList.contains("left-btn")) {
            toggleHightlighted(selectedIcon, false);
            selectedIcon = (2 + selectedIcon) % constants_1.ICONS.length;
            toggleHightlighted(selectedIcon, true);
        }
        else if (target.classList.contains("right-btn")) {
            toggleHightlighted(selectedIcon, false);
            selectedIcon = (1 + selectedIcon) % constants_1.ICONS.length;
            toggleHightlighted(selectedIcon, true);
        }
        else {
            handleUserAction(constants_1.ICONS[selectedIcon]);
        }
    }
    document.querySelector(".buttons").addEventListener("click", buttonClick);
}
exports.default = initButtons;
