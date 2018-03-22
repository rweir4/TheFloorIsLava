/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ \"./lib/platform.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./lib/player.js\");\n\n\n\nclass Board {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.platforms = [new _platform__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ x: 50, y: 400 }, { width: 200, height: 20 }, this.ctx)];\n    this.velocity = 73;\n    this.distance = 0;\n    this.falling = false;\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx);\n\n    let pos;\n    let size;\n    let prev_pos;\n    let prev_platform;\n\n    for (let i = 0; i < Board.NUM_PLATFORMS; i++) {\n      prev_platform = this.platforms[this.platforms.length - 1];\n      prev_pos = prev_platform.x + prev_platform.width + 30;\n\n      const pos = {\n        x: Math.floor(Math.random() * (prev_pos + 100 - prev_pos) + prev_pos),\n        y: Math.floor(Math.random() * (450 - 200) + 200)\n      };\n\n      const size = {\n        width: Math.floor(Math.random() * (200 - 30) + 30),\n        height: 20\n      };\n\n      this.platforms.push(new _platform__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pos, size, this.ctx));\n    }\n  }\n\n  draw() {\n    this.platforms.forEach(platform => {\n      platform.draw();\n    });\n\n    // if (!this.falling) {\n    //   this.velocity = this.velocity - 355;\n    //   this.distance = this.velocity + Math.floor(0.5 * -355);\n    // } else {\n    //\n    // }\n\n\n    // this.player.draw(this.distance);\n    this.player.draw();\n\n    // window.requestAnimationFrame(draw);\n  }\n}\n\nBoard.NUM_PLATFORMS = 4;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n//# sourceURL=webpack:///./lib/board.js?");

/***/ }),

/***/ "./lib/coord.js":
/*!**********************!*\
  !*** ./lib/coord.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Coord {\n  constructor() {}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Coord);\n\n//# sourceURL=webpack:///./lib/coord.js?");

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./lib/board.js\");\n\n\nclass Game {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx);\n  }\n\n  start() {\n    this.board.draw();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./lib/game.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./lib/game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"canvas\");\n  const ctx = canvas.getContext('2d');\n\n  canvas.width = 800;\n  canvas.height = 505;\n\n  new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx).start();\n});\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ }),

/***/ "./lib/platform.js":
/*!*************************!*\
  !*** ./lib/platform.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Platform {\n  constructor(pos, size, ctx) {\n    this.ctx = ctx;\n    this.x = pos.x;\n    this.y = pos.y;\n    this.width = size.width;\n    this.height = size.height;\n  }\n\n  update() {}\n\n  draw() {\n    this.ctx.fillRect(this.x, this.y, this.width, this.height);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Platform);\n\n//# sourceURL=webpack:///./lib/platform.js?");

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _coord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coord */ \"./lib/coord.js\");\n\n\nclass Player {\n  constructor(ctx) {\n    this.dir = 'R';\n    this.x = 55;\n    this.y = 365;\n    this.ctx = ctx;\n\n    this.jumping = false;\n  }\n\n  onPlatform() {\n    if (this.pos.equals(platform.pos)) {\n      return true;\n    }\n    return false;\n  }\n\n  // walk(dir) {\n  //   if (this.withinDimensions(this.change(Player.COORDS[dir])) {\n  //\n  //   }\n  // }\n\n  // jump() {\n  //   const parabola = x**2\n  // }\n\n  draw() {\n    this.ctx.fillStyle = \"#4253f4\";\n    this.ctx.fillRect(this.x, this.y, 20, 35);\n  }\n}\n\nPlayer.COORDS = {\n  \"L\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-1, 0),\n  \"R\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](1, 0)\n};\n\nPlayer.MOVES = {\n  32: \"Space\",\n  37: \"L\",\n  39: \"R\"\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./lib/player.js?");

/***/ })

/******/ });