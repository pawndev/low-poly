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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LowPoly__ = __webpack_require__(1);


let origin = document.querySelector('#origin');
let lowpolify = document.querySelector('#lowpolify');
let fileInput = document.querySelector('#importFile');
let lowPoly = new __WEBPACK_IMPORTED_MODULE_0__LowPoly__["a" /* default */](origin, lowpolify);

fileInput.addEventListener("change", lowPoly.importImage.bind(lowPoly));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LowPoly {
    constructor(canvasElement, lowpolifyCanvas) {
        this._canvas = canvasElement;
        this._lowpolifyCanvas = lowpolifyCanvas;
        this._context = canvasElement.getContext('2d');
        this._lowpolifyContext = lowpolifyCanvas.getContext('2d');
    }

    readerLoad(evt) {
        this.originalImg = new Image();
        this.originalImg.onload = this.imgLoad.bind(this);
        this.originalImg.src = evt.target.result;
    }

    imgLoad(evt) {
        this._canvas.width = this.originalImg.width;
        this._canvas.height = this.originalImg.height;

        this._lowpolifyCanvas.width = this.originalImg.width;
        this._lowpolifyCanvas.height = this.originalImg.height;

        this._context.drawImage(this.originalImg, 0, 0);
        this.pixelsOriginal = this._context.getImageData(0, 0, this.originalImg.width, this.originalImg.height);

        for (var i = 0; i < this.pixelsOriginal.data.length; i += 4) {
            this.pixelsOriginal.data[i] = 255 - this.pixelsOriginal.data[i];
            this.pixelsOriginal.data[i + 1] = 255 - this.pixelsOriginal.data[i + 1];
            this.pixelsOriginal.data[i + 2] = 255 - this.pixelsOriginal.data[i + 2];
            this.pixelsOriginal.data[i + 3] = 255;
        }

        this._lowpolifyContext.putImageData(this.pixelsOriginal, 0, 0);
    }

    importImage(evt) {
        this._reader = new FileReader();
        this._reader.onload = this.readerLoad.bind(this);
        this._reader.readAsDataURL(evt.target.files[0]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LowPoly;


/***/ })
/******/ ]);