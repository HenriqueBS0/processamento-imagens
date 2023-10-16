const Image = require("./Image");
const ImageType = require("./ImageType");

module.exports = class ImageFormatConverter {

    /**
     * @param {Image} image 
     * @param {Number} threshold 
     */
    static toPBM(image, threshold) {
        return Image.buildFromData(
            ImageType.PBM,
            image.getWidth(),
            image.getHeight(),
            1,
            this.#changePixelMatriz(image.getPixelMatriz(), threshold)
        );
    }

    /**
     * @param {Array<Array<Array<Number>>>} pixelMatriz
     * @param {Number} threshold
     * @returns {Array<Array<Array<Number>>>}
     */
    static #changePixelMatriz(pixelMatriz, threshold) {
        return pixelMatriz.map(line => {
            return line.map(pixelValues => {
                const average = Math.round(pixelValues.reduce((a, b) => a + b) / pixelValues.length);
                return [average >= threshold ? 0 : 1];
            });
        });
    }
}