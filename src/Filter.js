export default class Filter {
    constructor() { }

    invert(pixelsArray) {
        for (let x = 0, lenX = pixelsArray.length; x < len; x += 1) {
            for (let y = 0, lenY = pixelsArray[x].length; y < lenY; y += 1) {
                let pixel = pixelsArray[x][y];

                pixel.Red = 255 - Pixel.Red;
                pixel.Green = 255 - Pixel.Green;
                pixel.Blue = 255 - Pixel.Blue;
                pixel.Alpha = 255;
            }
        }
    }
}