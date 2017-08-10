import CanvasUtil from './utils/CanvasUtil';

export default class LowPoly {
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
        this.pixelsCopy = CanvasUtil.copyImageData(this._context, this.pixelsOriginal);

        // for (let i = 0; i < this.pixelsCopy.data.length; i += 4) {
        //     this.pixelsCopy.data[i] = 255 - this.pixelsCopy.data[i];
        //     this.pixelsCopy.data[i+1] = 255 - this.pixelsCopy.data[i+1];
        //     this.pixelsCopy.data[i+2] = 255 - this.pixelsCopy.data[i+2];
        //     this.pixelsCopy.data[i+3] = 255;
        // }

        for (let i = 0; i < this.pixelsCopy.data.length; i += 4) {
            let grayscale = this.getGreyScale(this.pixelsCopy.data[i], this.pixelsCopy.data[i+1], this.pixelsCopy.data[i+2]);
            this.pixelsCopy.data[i] = grayscale;
            this.pixelsCopy.data[i+1] = grayscale;
            this.pixelsCopy.data[i+2] = grayscale;
            this.pixelsCopy.data[i+3] = 255;            
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