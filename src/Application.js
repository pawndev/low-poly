import Canvas from './Canvas';

export default class Application {
    constructor(DOMObject) {
        this.DOMObject = DOMObject;
    }

    initialize() {
        this.originCanvas = new Canvas(this.DOMObject.get('origin'));
        this.rendered = new Canvas(this.DOMObject.get('render'));
        this.DOMObject.get('import').addEventListener('change', this._importImage.bind(this));
    }

    _importImage(evt) {
        let reader = new FileReader();

        reader.onload = this._readerLoad.bind(this);
        reader.readAsDataURL(evt.target.files[0]);
    }

    _readerLoad(evt) {
        this.originalImg = new Image();
        this.originalImg.onload = this._imgLoad.bind(this);
        this.originalImg.src = evt.target.result;
    }

    _imgLoad(evt) {
        this.originCanvas.Width = this.originalImg.width;
        this.originCanvas.Height = this.originalImg.height;

        this.rendered.Width = this.originalImg.width;
        this.rendered.Height = this.originalImg.height;

        this.originCanvas.drawImage(this.originalImg, 0, 0);
        this.pixelsOriginal = this.originCanvas.Data;
        this.pixelsCopy = this.pixelsOriginal.clone();

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
}