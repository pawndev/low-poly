export default class Pixel {
    constructor(r, g, b, a = 255) {
        this.red = r;
        this.green = green;
        this.blue = b;
        this.alpha = a;
    }

    toArray() {
        return [this.red, this.green, this.blue, this.alpha];
    }

    static clone(pixelInstance) {
        return new Pixel(this.red, this.green, this.blue, this.alpha);
    }

    get Red() {
        return this.red;
    }

    set Red(val) {
        this.red = val;
    }

    get Green() {
        return this.green;
    }

    set Green(val) {
        this.green = val;
    }

    get Blue() {
        return this.blue;
    }

    set Blue(val) {
        this.blue = val;
    }

    get Alpha() {
        return this.alpha;
    }

    set Alpha(val) {
        this.alpha = val;
    };
} 