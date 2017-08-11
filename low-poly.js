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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DOM__ = __webpack_require__(3);



let DOMObject = new __WEBPACK_IMPORTED_MODULE_1__DOM__["a" /* default */]().initialize();
let lowPoly = new __WEBPACK_IMPORTED_MODULE_0__LowPoly__["a" /* default */](DOMObject.get('origin'), DOMObject.get('render'));

DOMObject.get('import').addEventListener("change", lowPoly.importImage.bind(lowPoly));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_CanvasUtil__ = __webpack_require__(2);


class LowPoly {
    constructor(canvasElement, lowpolifyCanvas, config) {
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
        this.pixelsCopy = __WEBPACK_IMPORTED_MODULE_0__utils_CanvasUtil__["a" /* default */].copyImageData(this._context, this.pixelsOriginal);

        // for (let i = 0; i < this.pixelsCopy.data.length; i += 4) {
        //     this.pixelsCopy.data[i] = 255 - this.pixelsCopy.data[i];
        //     this.pixelsCopy.data[i+1] = 255 - this.pixelsCopy.data[i+1];
        //     this.pixelsCopy.data[i+2] = 255 - this.pixelsCopy.data[i+2];
        //     this.pixelsCopy.data[i+3] = 255;
        // }

        for (let i = 0; i < this.pixelsCopy.data.length; i += 4) {
            let grayscale = this.getGreyScale(this.pixelsCopy.data[i], this.pixelsCopy.data[i + 1], this.pixelsCopy.data[i + 2]);
            this.pixelsCopy.data[i] = grayscale;
            this.pixelsCopy.data[i + 1] = grayscale;
            this.pixelsCopy.data[i + 2] = grayscale;
            this.pixelsCopy.data[i + 3] = 255;
        }

        this._lowpolifyContext.putImageData(this.pixelsCopy, 0, 0);
    }

    importImage(evt) {
        this._reader = new FileReader();
        this._reader.onload = this.readerLoad.bind(this);
        this._reader.readAsDataURL(evt.target.files[0]);
    }

    getGreyScale(red, green, blue) {
        return 0.21 * red + 0.72 * green + 0.07 * blue;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LowPoly;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CanvasUtil {
    static copyImageData(ctx, src) {
        let dst = ctx.createImageData(src.width, src.height);
        dst.data.set(src.data);
        return dst;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasUtil;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOM extends Map {
    constructor() {
        super();
    }

    initialize() {
        this.set('origin', document.querySelector('#origin'));
        this.set('render', document.querySelector('#render'));
        this.set('import', document.querySelector('#import'));

        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DOM;


/***/ })
/******/ ]);