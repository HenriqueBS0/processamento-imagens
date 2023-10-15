const Image = require("./Image");

module.exports = class ImageCreatorByContent {

    /**
     * @param {Image} image
     * @param {Number} bits
     * @returns {Image}
     */
    static convert(image, bits) {
        const intensity = (bits ** 2) - 1;

        const pixelMatriz = this.#changePixelMatriz(
            image.getPixelMatriz(),
            intensity / image.getIntensity()
        );

        return Image.buildFromData(
            image.getType(),
            image.getWidth(),
            image.getHeight(),
            intensity,
            pixelMatriz
        );
    }

    /**
     * @param {Array<Array<Array<Number>>>} pixelMatriz
     * @param {Number} multiplier 
     * @returns {Array<Array<Array<Number>>>}
     */
    static #changePixelMatriz(pixelMatriz, multiplier) {
        return pixelMatriz.map(line => {
            return line.map(pixelValues => {
                return pixelValues.map(value => Math.round(value * multiplier));
            });
        });
    }
}