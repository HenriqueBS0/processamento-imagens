const Image = require("./Image");
const ImageMatrizPixelModifier = require("./ImageMatrizPixelModifier");

class ImageBitConverter {

    /**
     * @param {Image} image
     * @param {Number} bits
     * @returns {Image}
     */
    static convert(image, bits) {
        const intensity = (bits ** 2) - 1;

        const pixelMatriz = ImageMatrizPixelModifier.modify(image.getPixelMatriz(), pixelValues => {
            return pixelValues.map(value => Math.round(value * (intensity / image.getIntensity())));
        });

        return Image.buildFromData(
            image.getType(),
            image.getWidth(),
            image.getHeight(),
            intensity,
            pixelMatriz
        );
    }
}

module.exports = ImageBitConverter;