"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserAction = void 0;
var ui_1 = require("./ui");
var constants_1 = require("./constants");
var gameState = {
    current: "INIT",
    clock: 1,
    wakeTime: -1,
    sleepTime: -1,
    hungryTime: -1,
    poopTime: -1,
    dieTime: -1,
    timeToStartCelebrating: -1,
    timeToEndCelebrating: -1,
    tick: function () {
        this.clock++;
        if (this.clock === this.wakeTime) {
            this.wake();
        }
        else if (this.clock === this.sleepTime) {
            this.sleep();
        }
        else if (this.clock === this.hungryTime) {
            this.getHungry();
        }
        else if (this.clock === this.dieTime) {
            this.die();
        }
        else if (this.clock === this.timeToStartCelebrating) {
            this.startcelebrating();
        }
        else if (this.clock === this.timeToEndCelebrating) {
            this.endCelebrating();
        }
        else if (this.clock === this.poopTime) {
            this.poop();
        }
        return this.clock;
    },
    startGame: function () {
        this.current = "HATCHING";
        this.wakeTime = this.clock + 3;
        ui_1.modFox("egg");
        ui_1.modScene("day");
        constants_1.writeModal();
    },
    wake: function () {
        this.current = "IDLING";
        this.wakeTime = -1;
        this.scene = Math.random() > constants_1.RAIN_CHANCE ? 0 : 1;
        ui_1.modScene(constants_1.SCENES[this.scene]);
        this.sleepTime = this.clock + constants_1.DAY_LENGTH;
        this.hungryTime = constants_1.getNextHungerTime(this.clock);
        this.determineFoxState();
    },
    sleep: function () {
        this.state = "SLEEP";
        ui_1.modFox("sleep");
        ui_1.modScene("night");
        this.clearTimers();
        this.wakeTime = this.clock + constants_1.NIGHT_LENGTH;
    },
    getHungry: function () {
        this.current = "HUNGRY";
        this.dieTime = constants_1.getNextDieTime(this.clock);
        this.hungryTime = -1;
        ui_1.modFox("hungry");
    },
    poop: function () {
        this.current = "POOPING";
        this.poopTime = -1;
        this.dieTime = constants_1.getNextDieTime(this.clock);
        ui_1.modFox("pooping");
    },
    die: function () {
        this.current = "DEAD";
        ui_1.modScene("dead");
        ui_1.modFox("dead");
        this.clearTimers();
        constants_1.writeModal("The fox died :( <br/> Press the middle button to start");
    },
    startcelebrating: function () {
        this.current = "CELEBRATING";
        ui_1.modFox("celebrate");
        this.timeToStartCelebrating = -1;
        this.timeToEndCelebrating = this.clock + 2;
    },
    endCelebrating: function () {
        this.timeToEndCelebrating = -1;
        this.current = "IDLING";
        ui_1.togglePoopBag(false);
        this.determineFoxState();
    },
    determineFoxState: function () {
        if (this.current === "IDLING") {
            if (constants_1.SCENES[this.scene] === "rain") {
                ui_1.modFox("rain");
            }
            else {
                ui_1.modFox("idling");
            }
        }
    },
    handleUserAction: function (icon) {
        if (["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)) {
            // do nothing
            return;
        }
        if (this.current === "INIT" || this.current === "DEAD") {
            this.startGame();
            return;
        }
        switch (icon) {
            case "weather":
                this.changeWeather();
                break;
            case "poop":
                this.cleanUpPoop();
                break;
            case "fish":
                this.feed();
                break;
        }
    },
    changeWeather: function () {
        this.scene = (this.scene + 1) % constants_1.SCENES.length;
        ui_1.modScene(constants_1.SCENES[this.scene]);
        this.determineFoxState();
    },
    cleanUpPoop: function () {
        if (this.current !== "POOPING") {
            return;
        }
        this.dieTime = -1;
        ui_1.togglePoopBag(true);
        this.startcelebrating();
        this.hungryTime = constants_1.getNextHungerTime(this.clock);
    },
    feed: function () {
        if (this.current !== "HUNGRY") {
            return;
        }
        this.current = "FEEDING";
        this.dieTime = -1;
        this.poopTime = constants_1.getNextPoopTime(this.clock);
        this.timeToStartCelebrating = this.clock + 2;
    },
    clearTimers: function () {
        this.wakeTime = -1;
        this.sleepTime = -1;
        this.hungryTime = -1;
        this.dieTime = -1;
        this.poopTime = -1;
        this.timeToStartCelebrating = -1;
        this.timeToEndCelebrating = -1;
    },
};
exports.handleUserAction = gameState.handleUserAction.bind(gameState);
exports.default = gameState;
