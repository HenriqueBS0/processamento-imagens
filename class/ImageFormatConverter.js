const Image = require('./Image');
const ImageType = require('./ImageType');
const ImageMatrizPixelModifier = require('./ImageMatrizPixelModifier')
const ImageBitConverter = require('./ImageBitConverter');

class ImageFormatConverter {

    /**
     * @param {Image} image
     * @param {Number} threshold
     */
    static toPBM(image, threshold) {
        const pixelMatriz = ImageMatrizPixelModifier.modify(image.getPixelMatriz(), pixelValues => {
            const average = Math.round(pixelValues.reduce((a, b) => a + b) / pixelValues.length);
            return [average >= threshold ? 0 : 1];
        });

        return Image.buildFromData(
            ImageType.PBM,
            image.getWidth(),
            image.getHeight(),
            1,
            pixelMatriz
        );
    }

    /**
     * @param {Image} image
     * @param {Number} bits
     */
    static toPGM(image, bits) {
        return ImageBitConverter.convert(Image.buildFromData(
            ImageType.PGM,
            image.getWidth(),
            image.getHeight(),
            image.getIntensity(),
            ImageMatrizPixelModifier.average(image.getPixelMatriz())
        ), bits);
    }

    /**
     * @param {Image} image
     * @param {Number} bits
     */
    static toPPM(image, bits) {

        const pixelMatriz = ImageType.PPM === image.getType()
            ? image.getPixelMatriz()
            : image.getPixelMatriz().map(pixelValues => [
                pixelValues[0],
                pixelValues[0],
                pixelValues[0]
            ]);

        return ImageBitConverter.convert(Image.buildFromData(
            ImageType.PPM,
            image.getWidth(),
            image.getHeight(),
            image.getIntensity(),
            pixelMatriz
        ), bits);
    }
}

module.exports = ImageFormatConverter;