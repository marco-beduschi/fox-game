parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"sRuM":[function(require,module,exports) {
"use strict";function e(e){document.querySelector(".fox").className="fox fox-"+e}function o(e){document.querySelector(".game").className="game "+e}function t(e){document.querySelector(".poop-bag").classList.toggle("hidden",!e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.togglePoopBag=exports.modScene=exports.modFox=void 0,exports.modFox=e,exports.modScene=o,exports.togglePoopBag=t;
},{}],"eKDL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.writeModal=exports.getNextPoopTime=exports.getNextDieTime=exports.getNextHungerTime=exports.NIGHT_LENGTH=exports.DAY_LENGTH=exports.SCENES=exports.RAIN_CHANCE=exports.ICONS=exports.TICK_RATE=void 0,exports.TICK_RATE=1e3,exports.ICONS=["fish","poop","weather"],exports.RAIN_CHANCE=.2,exports.SCENES=["day","rain"],exports.DAY_LENGTH=60,exports.NIGHT_LENGTH=3,exports.getNextHungerTime=function(e){return Math.floor(3*Math.random())+5+e},exports.getNextDieTime=function(e){return Math.floor(2*Math.random())+3+e},exports.getNextPoopTime=function(e){return Math.floor(2*Math.random())+6+e},exports.writeModal=function(e){void 0===e&&(e=""),document.querySelector(".modal").innerHTML='<div class="modal-inner">'+e+"</div>"};
},{}],"U181":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleUserAction=void 0;var e=require("./ui"),t=require("./constants"),i={current:"INIT",clock:1,wakeTime:-1,sleepTime:-1,hungryTime:-1,poopTime:-1,dieTime:-1,timeToStartCelebrating:-1,timeToEndCelebrating:-1,tick:function(){return this.clock++,this.clock===this.wakeTime?this.wake():this.clock===this.sleepTime?this.sleep():this.clock===this.hungryTime?this.getHungry():this.clock===this.dieTime?this.die():this.clock===this.timeToStartCelebrating?this.startcelebrating():this.clock===this.timeToEndCelebrating?this.endCelebrating():this.clock===this.poopTime&&this.poop(),this.clock},startGame:function(){this.current="HATCHING",this.wakeTime=this.clock+3,e.modFox("egg"),e.modScene("day"),t.writeModal()},wake:function(){this.current="IDLING",this.wakeTime=-1,this.scene=Math.random()>t.RAIN_CHANCE?0:1,e.modScene(t.SCENES[this.scene]),this.sleepTime=this.clock+t.DAY_LENGTH,this.hungryTime=t.getNextHungerTime(this.clock),this.determineFoxState()},sleep:function(){this.state="SLEEP",e.modFox("sleep"),e.modScene("night"),this.clearTimers(),this.wakeTime=this.clock+t.NIGHT_LENGTH},getHungry:function(){this.current="HUNGRY",this.dieTime=t.getNextDieTime(this.clock),this.hungryTime=-1,e.modFox("hungry")},poop:function(){this.current="POOPING",this.poopTime=-1,this.dieTime=t.getNextDieTime(this.clock),e.modFox("pooping")},die:function(){this.current="DEAD",e.modScene("dead"),e.modFox("dead"),this.clearTimers(),t.writeModal("The fox died :( <br/> Press the middle button to start")},startcelebrating:function(){this.current="CELEBRATING",e.modFox("celebrate"),this.timeToStartCelebrating=-1,this.timeToEndCelebrating=this.clock+2},endCelebrating:function(){this.timeToEndCelebrating=-1,this.current="IDLING",e.togglePoopBag(!1),this.determineFoxState()},determineFoxState:function(){"IDLING"===this.current&&("rain"===t.SCENES[this.scene]?e.modFox("rain"):e.modFox("idling"))},handleUserAction:function(e){if(!["SLEEP","FEEDING","CELEBRATING","HATCHING"].includes(this.current))if("INIT"!==this.current&&"DEAD"!==this.current)switch(e){case"weather":this.changeWeather();break;case"poop":this.cleanUpPoop();break;case"fish":this.feed()}else this.startGame()},changeWeather:function(){this.scene=(this.scene+1)%t.SCENES.length,e.modScene(t.SCENES[this.scene]),this.determineFoxState()},cleanUpPoop:function(){"POOPING"===this.current&&(this.dieTime=-1,e.togglePoopBag(!0),this.startcelebrating(),this.hungryTime=t.getNextHungerTime(this.clock))},feed:function(){"HUNGRY"===this.current&&(this.current="FEEDING",this.dieTime=-1,this.poopTime=t.getNextPoopTime(this.clock),this.timeToStartCelebrating=this.clock+2)},clearTimers:function(){this.wakeTime=-1,this.sleepTime=-1,this.hungryTime=-1,this.dieTime=-1,this.poopTime=-1,this.timeToStartCelebrating=-1,this.timeToEndCelebrating=-1}};exports.handleUserAction=i.handleUserAction.bind(i),exports.default=i;
},{"./ui":"sRuM","./constants":"eKDL"}],"EcbZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./constants"),e=function(e,n){document.querySelector("."+t.ICONS[e]+"-icon").classList.toggle("highlighted",n)};function n(n){var s=0;document.querySelector(".buttons").addEventListener("click",function(c){var i=c.target;i.classList.contains("left-btn")?(e(s,!1),s=(2+s)%t.ICONS.length,e(s,!0)):i.classList.contains("right-btn")?(e(s,!1),s=(1+s)%t.ICONS.length,e(s,!0)):n(t.ICONS[s])})}exports.default=n;
},{"./constants":"eKDL"}],"FyzG":[function(require,module,exports) {
"use strict";var e=u(require("./gameState.ts")),t=require("./constants.ts"),r=n(require("./buttons.ts"));function n(e){return e&&e.__esModule?e:{default:e}}function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}function u(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var a=n?Object.getOwnPropertyDescriptor(e,u):null;a&&(a.get||a.set)?Object.defineProperty(r,u,a):r[u]=e[u]}return r.default=e,t&&t.set(e,r),r}function a(){console.log("starting game"),(0,r.default)(e.handleUserAction);let n=Date.now();requestAnimationFrame(function r(){const o=Date.now();n<=o&&(e.default.tick(),n=o+t.TICK_RATE),requestAnimationFrame(r)})}a();
},{"./gameState.ts":"U181","./constants.ts":"eKDL","./buttons.ts":"EcbZ"}]},{},["FyzG"], null)
//# sourceMappingURL=init.94b61d5f.js.map