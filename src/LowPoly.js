export default class LowPoly {
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
            this.pixelsOriginal.data[i+1] = 255 - this.pixelsOriginal.data[i+1];
            this.pixelsOriginal.data[i+2] = 255 - this.pixelsOriginal.data[i+2];
            this.pixelsOriginal.data[i+3] = 255;
        }
        this._lowpolifyContext.putImageData(this.pixelsOriginal, 0, 0);
    }

    importImage(evt) {
        this._reader = new FileReader();
        this._reader.onload = this.readerLoad.bind(this);
        this._reader.readAsDataURL(evt.target.files[0]);
    }
}