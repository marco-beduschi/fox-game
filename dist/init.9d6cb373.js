// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ui.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
},{}],"constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  if (text === void 0) {
    text = "";
  }

  document.querySelector(".modal").innerHTML = "<div class=\"modal-inner\">" + text + "</div>";
};
},{}],"gameState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startcelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
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
      } else {
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
  }
};
exports.handleUserAction = gameState.handleUserAction.bind(gameState);
exports.default = gameState;
},{"./ui":"ui.ts","./constants":"constants.ts"}],"buttons.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("./constants");

var toggleHightlighted = function (iconIndex, show) {
  document.querySelector("." + constants_1.ICONS[iconIndex] + "-icon").classList.toggle("highlighted", show);
};

function initButtons(handleUserAction) {
  var selectedIcon = 0;

  function buttonClick(_a) {
    var target = _a.target;

    if (target.classList.contains("left-btn")) {
      toggleHightlighted(selectedIcon, false);
      selectedIcon = (2 + selectedIcon) % constants_1.ICONS.length;
      toggleHightlighted(selectedIcon, true);
    } else if (target.classList.contains("right-btn")) {
      toggleHightlighted(selectedIcon, false);
      selectedIcon = (1 + selectedIcon) % constants_1.ICONS.length;
      toggleHightlighted(selectedIcon, true);
    } else {
      handleUserAction(constants_1.ICONS[selectedIcon]);
    }
  }

  document.querySelector(".buttons").addEventListener("click", buttonClick);
}

exports.default = initButtons;
},{"./constants":"constants.ts"}],"init.js":[function(require,module,exports) {
"use strict";

var _gameState = _interopRequireWildcard(require("./gameState.ts"));

var _constants = require("./constants.ts");

var _buttons = _interopRequireDefault(require("./buttons.ts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function init() {
  console.log("starting game");
  (0, _buttons.default)(_gameState.handleUserAction);
  let nextTimeToTick = Date.now(); // :eyes: Clojure!

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      _gameState.default.tick();

      nextTimeToTick = now + _constants.TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  requestAnimationFrame(nextAnimationFrame);
}

init();
},{"./gameState.ts":"gameState.ts","./constants.ts":"constants.ts","./buttons.ts":"buttons.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56403" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","init.js"], null)
//# sourceMappingURL=/init.9d6cb373.js.map