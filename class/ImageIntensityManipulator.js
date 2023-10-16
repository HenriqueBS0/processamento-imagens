const Image = require("./Image");

module.exports = class ImageIntensityManipulator {

    /** 
     * @param {Image} image 
     * @param {Number} percent 
     */
    static reduce(image, percent) {
        percent = percent <= 100 ? percent : 100;
        return this.#change(image, 1 - (percent / 100));
    }

    /** 
     * @param {Image} image 
     * @param {Number} percent 
     */
    static increase(image, percent) {
        return this.#change(image, 1 + (percent / 100));
    }

    /** 
     * @param {Image} image 
     * @param {Number} multiplier 
     */
    static #change(image, multiplier) {
        return Image.buildFromData(
            image.getType(),
            image.getWidth(),
            image.getHeight(),
            image.getIntensity(),
            this.#changePixelMatriz(
                image.getPixelMatriz(),
                multiplier,
                image.getIntensity()
            )
        );
    }

    /**
     * @param {Array<Array<Array<Number>>>} pixelMatriz
     * @param {Number} multiplier 
     * @param {Number} maximumValue 
     * @returns {Array<Array<Array<Number>>>}
     */
    static #changePixelMatriz(pixelMatriz, multiplier, maximumValue) {
        return pixelMatriz.map(line => {
            return line.map(pixelValues => {
                return pixelValues.map(value => Math.round(value * multiplier) > maximumValue ? maximumValue : Math.round(value * multiplier));
            });
        });
    }
}