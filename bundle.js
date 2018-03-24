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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./platform */ \"./lib/platform.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./lib/player.js\");\n/* harmony import */ var _coord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coord */ \"./lib/coord.js\");\n\n\n\n\nclass Board {\n  constructor(ctx) {\n    this.ctx = ctx;\n    const coord = new _coord__WEBPACK_IMPORTED_MODULE_2__[\"default\"](50, 400);\n    this.platforms = [new _platform__WEBPACK_IMPORTED_MODULE_0__[\"default\"](coord, { width: 200, height: 20 }, this.ctx)];\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.ctx);\n\n    this.setupPieces();\n\n    this.playerOnPlatform = this.playerOnPlatform.bind(this);\n    this.draw = this.draw.bind(this);\n  }\n\n  setupPieces() {\n    this.addListeners();\n    this.createPlatforms();\n  }\n\n  addListeners() {\n    window.addEventListener(\"keydown\", key => {\n      const keyCode = key.keyCode;\n\n      if ([37, 39].includes(keyCode)) {\n        this.player.walk(keyCode);\n        this.platforms.forEach(platform => {\n          platform.transform(keyCode);\n        });\n      } else if (keyCode === 32) {\n        this.player.jumping = true;\n        this.player.velocity_y = 8;\n      }\n    });\n  }\n\n  deletePlatforms() {\n    //if platform[3] is at x = 0, delete this.platforms.slice(0,3)\n  }\n\n  createPlatforms() {\n    let pos;\n    let size;\n    let prev_pos;\n    let prev_platform;\n\n    for (let i = 0; i < Board.NUM_PLATFORMS; i++) {\n      prev_platform = this.platforms[this.platforms.length - 1];\n      prev_pos = prev_platform.pos.x + prev_platform.width + 30;\n\n      const pos = new _coord__WEBPACK_IMPORTED_MODULE_2__[\"default\"](Math.floor(Math.random() * (prev_pos + 100 - prev_pos) + prev_pos), Math.floor(Math.random() * (450 - 200) + 200));\n\n      const size = {\n        width: Math.floor(Math.random() * (200 - 30) + 30),\n        height: 20\n      };\n      this.platforms.push(new _platform__WEBPACK_IMPORTED_MODULE_0__[\"default\"](pos, size, this.ctx));\n    }\n  }\n\n  playerOnPlatform() {\n    const player = this.player;\n    for (let i = 0; i < this.platforms.length; i++) {\n      if (player.pos.inPlatformHeight(this.platforms[i]) && player.pos.onPlatformWidth(this.platforms[i])) {\n        this.player.pos.y = this.platforms[i].pos.y - 35;\n        return true;\n      }\n    }\n    return false;\n  }\n\n  toggleFalling() {\n    if (this.player.velocity_y === 0 && this.player.jumping) {\n      this.player.falling = true;\n    }\n  }\n\n  isPlayerFalling() {\n    if (this.playerOnPlatform()) {\n      this.player.jumping = false;\n    } else {\n\n      if (!this.player.jumping) {\n        this.player.fall();\n      }\n    }\n  }\n\n  isGameOver() {\n    if (this.player.pos.y >= 505) {\n      return true;\n    }\n  }\n\n  createOffscreenPlatforms() {\n    const last_platform_x = this.platforms[this.platforms.length - 1].pos.x;\n    if (last_platform_x === 800) {\n      this.createPlatforms();\n    }\n  }\n\n  draw() {\n    this.ctx.clearRect(0, 0, 800, 505);\n    this.platforms.forEach(platform => {\n      platform.draw();\n    });\n\n    this.toggleFalling();\n\n    if (this.player.jumping) {\n      this.player.velocity_y -= 9.81 * 0.017;\n      this.player.distance = this.player.velocity_y - Math.floor(0.5 * 9.81 * Math.pow(0.017, 2));\n      this.player.jump();\n    }\n\n    this.isPlayerFalling();\n    this.player.draw();\n\n    this.createOffscreenPlatforms();\n\n    this.isGameOver();\n\n    window.requestAnimationFrame(this.draw);\n  }\n}\n\nBoard.NUM_PLATFORMS = 4;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n//# sourceURL=webpack:///./lib/board.js?");

/***/ }),

/***/ "./lib/coord.js":
/*!**********************!*\
  !*** ./lib/coord.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Coord {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  plus(new_coord) {\n    this.x += new_coord.x;\n    this.y += new_coord.y;\n    // debugger\n    return new Coord(this.x, this.y);\n  }\n\n  withinDimensions(player) {\n    const dim_x = 800;\n    const dim_y = 505;\n\n    return this.x > 0 && this.x + player.width < 800 && this.y + player.height > 0;\n  }\n\n  inPlatformHeight(platform) {\n    const range = [platform.pos.y - 5, platform.pos.y + 5];\n    const platform_y = this.y + 35;\n    return platform_y > range[0] && platform_y < range[1];\n  }\n\n  onPlatformWidth(platform) {\n    return platform.pos.x < this.x + 20 && platform.pos.x + platform.width > this.x;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Coord);\n\n//# sourceURL=webpack:///./lib/coord.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _coord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coord */ \"./lib/coord.js\");\n\n\nclass Platform {\n  constructor(pos, size, ctx) {\n    this.ctx = ctx;\n    this.pos = pos;\n    this.width = size.width;\n    this.height = size.height;\n  }\n\n  transform(key) {\n    const dir = Platform.MOVES[key];\n    this.pos.plus(Platform.COORDS[dir]);\n  }\n\n  draw() {\n    this.ctx.fillStyle = \"black\";\n    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);\n  }\n}\n\nPlatform.COORDS = {\n  \"L\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, 0),\n  \"R\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-5, 0)\n};\n\nPlatform.MOVES = {\n  32: \"Space\",\n  37: \"L\",\n  39: \"R\"\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Platform);\n\n//# sourceURL=webpack:///./lib/platform.js?");

/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _coord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coord */ \"./lib/coord.js\");\n\n\nclass Player {\n  constructor(ctx) {\n    this.dir = 'R';\n    this.pos = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](55, 365);\n    this.ctx = ctx;\n    this.height = 35;\n    this.width = 20;\n    this.velocity_x = Math.floor(5 / 0.017);\n    this.velocity_y = 0;\n    this.distance = 0;\n\n    this.falling = false;\n    this.jumping = false;\n  }\n\n  walk(key) {\n    if (this.pos.withinDimensions(this) || this.velocityDiffers(key)) {\n      const dir = Player.MOVES[key];\n      if (dir === 'L') {\n        this.velocity_x = -73;\n      } else {\n        this.velocity_x = 73;\n      }\n      this.pos.plus(Player.COORDS[dir]);\n    }\n  }\n\n  fall() {\n    this.pos.plus(Player.COORDS.fall);\n  }\n\n  velocityDiffers(key) {\n    return this.pos.x === 0 && Player.MOVES[key] === 'R' || this.pos.x + this.width === 800 && Player.MOVES[key] === 'L';\n  }\n\n  jump() {\n    const d = this.distance;\n    if (this.velocity_y > 0) {\n      let up;\n      if (this.velocity_x > 0) {\n        up = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, -1 * d);\n        this.pos.plus(up);\n      } else {\n        up = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-5, -1 * d);\n        this.pos.plus(up);\n      }\n    } else {\n      let down;\n      if (this.velocity_x > 0) {\n        down = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, -1 * d);\n        return this.pos.plus(down);\n      } else {\n        down = new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-5, d);\n        return this.pos.plus(down);\n      }\n    }\n  }\n\n  draw() {\n    this.ctx.fillStyle = \"#4253f4\";\n    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);\n  }\n}\n\nPlayer.COORDS = {\n  \"L\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-5, 0),\n  \"R\": new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, 0),\n  'fall': new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 5),\n  'JR': new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, -5),\n  'JL': new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-5, -5),\n  'FR': new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, 5),\n  'FL': new _coord__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-5, 5)\n};\n\nPlayer.MOVES = {\n  32: \"Space\",\n  37: \"L\",\n  39: \"R\"\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n//# sourceURL=webpack:///./lib/player.js?");

/***/ })

/******/ });