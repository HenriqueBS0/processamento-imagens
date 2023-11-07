const Image = require("./Image");
const ImageMatrizPixelModifier = require("./ImageMatrizPixelModifier");

class ImageNegativeConverter {
    /**
     * @param {Image} image
     */
    static toNegative(image) {
        return Image.buildFromData(
            image.getType(),
            image.getWidth(),
            image.getHeight(),
            image.getIntensity(),
            ImageMatrizPixelModifier.modify(
                image.getPixelMatriz(),
                pixelValues => pixelValues.map(value => image.getIntensity() - value)
            )
        );
    }
}

module.exports = ImageNegativeConverter;