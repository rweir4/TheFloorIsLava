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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ \"./lib/platform.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./lib/player.js\");\n/* harmony import */ var _coord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coord */ \"./lib/coord.js\");\n/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timer */ \"./lib/timer.js\");\n\n\n\n\n\nclass Board {\n  constructor(ctx) {\n    this.ctx = ctx;\n    const coord = new _coord__WEBPACK_IMPORTED_MODULE_2__[\"default\"](300, 400);\n    this.platforms = [new _platform__WEBPACK_IMPORTED_MODULE_0__[\"default\"](coord, { width: 200, height: 13 }, this.ctx)];\n    this.timer = new _timer__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.ctx);\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx);\n\n    this.setupPieces();\n\n    this.playerOnPlatform = this.playerOnPlatform.bind(this);\n    this.draw = this.draw.bind(this);\n  }\n\n  setupPieces() {\n    window.addEventListener(\"keydown\", key => {\n      const keyCode = key.keyCode;\n      this.player.currentKey = keyCode;\n\n      if ([37, 39].includes(keyCode)) {\n        this.player.walking = true;\n        this.player.walk(keyCode);\n        this.platforms.forEach(platform => {\n          platform.transform(keyCode);\n        });\n      } else if (keyCode === 40 && this.player.jumping) {\n        this.player.falling = true;\n        this.player.fall();\n      }\n    });\n\n    window.addEventListener(\"keyup\", key => {\n      if ([37, 39].includes(key.keyCode)) {\n        this.player.walking = false;\n      }\n    });\n\n    this.addJumpListener();\n    this.createPlatforms();\n  }\n\n  addJumpListener() {\n    window.addEventListener(\"keydown\", key => {\n      const keyCode = key.keyCode;\n      this.currentKey = keyCode;\n\n      if (keyCode === 32) {\n        if (!this.player.second_jump) {\n          // if (this.player.jumping) {\n\n          this.player.second_jump = true;\n          // }\n          this.player.falling = false;\n          this.player.jumping = true;\n          this.player.velocity_y = 8;\n        }\n      }\n    });\n  }\n\n  deletePlatforms() {\n    //if platform[3] is at x = 0, delete this.platforms.slice(0,3)\n  }\n\n  createPlatforms() {\n    let pos;\n    let size;\n    let prev_pos;\n    let prev_platform;\n\n    //\n\n    for (let i = 0; i < Board.NUM_PLATFORMS; i++) {\n      prev_platform = this.platforms[this.platforms.length - 1];\n      prev_pos = prev_platform.pos.x + prev_platform.width + 30;\n\n      const pos = new _coord__WEBPACK_IMPORTED_MODULE_2__[\"default\"](Math.floor(Math.random() * (prev_pos + 200 - prev_pos) + prev_pos), Math.floor(Math.random() * (450 - 200) + 200));\n\n      const size = {\n        width: Math.floor(Math.random() * (200 - 30) + 30),\n        height: 13\n      };\n      this.platforms.push(new _platform__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pos, size, this.ctx));\n    }\n  }\n\n  playerOnPlatform() {\n    const player = this.player;\n    for (let i = 0; i < this.platforms.length; i++) {\n      if (player.pos.inPlatformHeight(player.prev_pos, this.platforms[i]) && player.pos.onPlatformWidth(this.platforms[i])) {\n\n        this.player.pos.y = this.platforms[i].pos.y - 35;\n\n        this.player.jumping = false;\n        this.player.second_jump = false;\n        this.player.falling = false;\n\n        return true;\n      }\n    }\n    return false;\n  }\n\n  isPlayerFalling() {\n    if (this.playerOnPlatform()) {\n      this.player.jumping = false;\n    } else if (this.player.falling || !this.player.jumping) {\n      this.player.fall();\n      this.player.jumping = false;\n    }\n  }\n\n  createOffscreenPlatforms() {\n    const last_platform_x = this.platforms[this.platforms.length - 1].pos.x;\n    // const second_last_platform_x = this.platforms[this.platforms.length - 2].pos.x;\n    if (last_platform_x <= 800 && last_platform_x > 795) {\n      return this.createPlatforms();\n    }\n  }\n\n  draw() {\n    this.ctx.clearRect(0, 0, 800, 505);\n    this.timer.draw();\n    // this.timer.time -= Math.floor(1 / 60.0);\n    this.timer.time -= 0.017;\n\n    this.platforms.forEach(platform => {\n      platform.draw();\n    });\n\n    if (this.player.jumping) {\n      this.player.velocity_y -= 9.81 * 0.017;\n      this.player.distance = this.player.velocity_y - Math.floor(0.5 * 9.81 * Math.pow(0.017, 2));\n      this.platforms.forEach(platform => {\n        platform.transform(32, this.player.velocity_x, this.player.jumping, this.player.walking);\n      });\n      this.player.jump();\n    }\n\n    if (this.player.walking) {\n      this.player.walk();\n      this.platforms.forEach(platform => {\n        platform.transform(32, this.player.velocity_x);\n      });\n    }\n\n    if (this.player.falling) {\n      // this.player.velocity_y -= (9.81 - 0.1);\n      // this.player.distance = this.player.velocity_y - Math.floor(0.5 * 9.81 * Math.pow(0.017, 2));\n      this.player.fall();\n    }\n\n    this.isPlayerFalling();\n    this.player.draw();\n\n    if (this.player.pos.y >= 505 || this.timer.time < 0) {\n      return alert('GAME OVER');\n    } else if (this.platforms.length === 30) {\n      return alert('YOU WON!');\n    }\n\n    this.createOffscreenPlatforms();\n    window.requestAnimationFrame(this.draw);\n  }\n}\n\nBoard.NUM_PLATFORMS = 10;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n//# sourceURL=webpack:///./lib/board.js?");

/***/ }),

/***/ "./lib/coord.js":
/*!**********************!*\
  !*** ./lib/coord.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Coord {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  plus(new_coord) {\n    this.x += new_coord.x;\n    this.y += new_coord.y;\n    //\n    return new Coord(this.x, this.y);\n  }\n\n  withinDimensions(player) {\n    return this.x >= 300 && this.x + player.width <= 500;\n  }\n\n  inPlatformHeight(prev_pos, platform) {\n    if (prev_pos < platform) {\n      return false;\n    }\n    const range = [platform.pos.y - 5, platform.pos.y + 5];\n    const platform_y = this.y + 35;\n    return platform_y > range[0] && platform_y < range[1];\n  }\n\n  onPlatformWidth(platform) {\n    return platform.pos.x < this.x + 20 && platform.pos.x + platform.width > this.x;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Coord);\n\n//# sourceURL=webpack:///./lib/coord.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _coord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coord */ \"./lib/coord.js\");\n\n\nclass Platform {\n  constructor(pos, size, ctx) {\n    this.ctx = ctx;\n    this.pos = pos;\n    this.width = size.width;\n    this.height = size.height;\n  }\n\n  transform(key, velocity, jumping, walking) {\n    let dir;\n    if (key !== 32) {\n      dir = Platform.MOVES[key];\n    } else {\n      if (velocity > 0) {\n        dir = jumping && walking ? 'RF' : 'R';\n      } else {\n        dir = jumping && walking ? 'LF' : 'L';\n      }\n    }\n\n    this.pos.plus(Platform.COORDS[dir]);\n  }\n\n  draw() {\n    this.ctx.fillStyle = \"black\";\n    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);\n  }\n}\n\nPlatform.COORDS = {\n  \"L\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, 0),\n  \"R\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-3, 0),\n  \"LF\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, 0),\n  \"RF\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-3, 0)\n};\n\nPlatform.MOVES = {\n  32: \"Space\",\n  37: \"L\",\n  39: \"R\"\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Platform);\n\n//# sourceURL=webpack:///./lib/platform.js?");

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _coord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coord */ \"./lib/coord.js\");\n\n\nclass Player {\n  constructor(ctx) {\n    this.dir = 'R';\n    this.pos = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](300, 365);\n    this.ctx = ctx;\n    this.height = 35;\n    this.width = 20;\n    this.velocity_x = Math.floor(5 / 0.017);\n    this.velocity_y = 0;\n    this.distance = 0;\n    this.prev_pos = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](300, 365);\n\n    this.walking = false;\n    this.falling = false;\n    this.jumping = false;\n    this.second_jump = false;\n    this.currentKey = 0;\n  }\n\n  walk(key) {\n\n    let dir;\n    if (key) {\n      dir = Player.MOVES[key];\n    } else {\n      dir = this.velocity_x > 0 ? 'R' : 'L';\n    }\n\n    if (dir === 'L') {\n      this.velocity_x = -73;\n    } else {\n      this.velocity_x = 73;\n    }\n\n    const prev_pos = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.pos.x, this.pos.y);\n    if (prev_pos.plus(Player.COORDS[dir]).withinDimensions(this)) {\n      console.log(this.pos);\n      return this.pos.plus(Player.COORDS[dir]);\n    } else {\n      return this.pos.plus(new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0));\n    }\n  }\n\n  fall() {\n    // const d = this.distance;\n    // this.pos.plus(new Coord(0, -1 * d));\n    this.pos.plus(Player.COORDS.fall);\n  }\n\n  jump() {\n    const d = this.distance;\n    let movement;\n    if (this.velocity_y > 0) {\n      movement = this.velocity_x > 0 ? new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, -1 * d) : new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-2, -1 * d);\n    } else {\n      movement = this.velocity_x > 0 ? new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, -1 * d) : new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-2, -1 * d);\n    }\n\n    const prev_pos = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.pos.x, this.pos.y);\n    if (prev_pos.plus(movement).withinDimensions(this)) {\n      return this.pos.plus(movement);\n    } else {\n      return this.pos.plus(new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, -1 * d));\n    }\n  }\n\n  draw() {\n    // this.ctx.fillStyle=\"#4253f4\";\n    this.ctx.fillStyle = \"white\";\n    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);\n  }\n}\n\nPlayer.COORDS = {\n  \"L\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-2, 0),\n  \"R\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, 0),\n  'fall': new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 3)\n};\n\nPlayer.MOVES = {\n  32: \"Space\",\n  37: \"L\",\n  39: \"R\",\n  40: 'fall'\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./lib/player.js?");

/***/ }),

/***/ "./lib/timer.js":
/*!**********************!*\
  !*** ./lib/timer.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Timer {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.time = 21;\n  }\n\n  draw() {\n    this.ctx.font = '48px sans-serif';\n    this.ctx.fillStyle = 'white';\n    this.ctx.fillText(Math.floor(this.time), 10, 50);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Timer);\n\n//# sourceURL=webpack:///./lib/timer.js?");

/***/ })

/******/ });