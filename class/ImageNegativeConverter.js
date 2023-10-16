const Image = require("./Image");

module.exports = class ImageNegativeConverter {
    /**
     * @param {Image} image
     */
    static toNegative(image) {
        return Image.buildFromData(
            image.getType(),
            image.getWidth(),
            image.getHeight(),
            image.getIntensity(),
            this.#changePixelMatriz(image.getPixelMatriz(), image.getIntensity())
        );
    }

    /**
     * @param {Array<Array<Array<Number>>>} pixelMatriz
     * @param {Number} intensity
     * @returns {Array<Array<Array<Number>>>}
     */
    static #changePixelMatriz(pixelMatriz, intensity) {
        return pixelMatriz.map(line => {
            return line.map(pixelValues => {
                return pixelValues.map(value => intensity - value);
            });
        });
    }
}