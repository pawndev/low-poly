import Pixel from './Pixel';

export default class Canvas {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this._data = this.Data;
    }

    drawImage(img, x, y) {
        return this._context.drawImage.call(this._canvas, img, x, y);
    }

    get Data() {
        if (this._data) {
            return this._data;
        }
        let l  = this.Width * this.Height;
        this._data = [[]];

        for (let i = 0; i < l; i += 1) {
            let r = pixels[i*4];
            let g = pixels[i*4+1];
            let b = pixels[i*4+2];
            let a = pixels[i*4+3];

            // get the position of pixel
            let y = parseInt(i / w, 10);
            let x = i - y * w;

            this._data[x][y] = new Pixel(r, g, b, a);
        }

        return this._data;
    }

    get OriginalData() {
        return this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
    }

    get Width() {
        return this._canvas.width;
    }

    set Width(width) {
        this._canvas.width = width;
    }

    get Height() {
        return this._canvas.height;
    }

    set Height(height) {
        this._canvas.height = height;
    }
}