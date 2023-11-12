const Image = require("./Image");
const ImageMatrizPixelModifier = require("./ImageMatrizPixelModifier");
const ImageType = require("./ImageType");

/**
 * @typedef {Object} ColorChannels
 * @property {{import('./Image').PixelChannel}} red
 * @property {{import('./Image').PixelChannel}} green
 * @property {{import('./Image').PixelChannel}} blue
 */

/**
 * @typedef {Object} ImageSeparate
 * @property {Image} red
 * @property {Image} green
 * @property {Image} blue
 */

class ImageColorChannelSeparator {

    /**
     * Separa as informações de canal de cor de uma imagem.
     * 
     * @param {Image} image - A imagem da qual separar os canais de cor.
     * @returns {ColorChannels} - Os canais de cor separados.
     */
    static separate(image) {
        const pixelMatrix = image.getPixelMatrix();
        const colorChannels = {
            red: [],
            green: [],
            blue: []
        };

        pixelMatrix.forEach((line, indexLine) => {
            colorChannels.red.push([]);
            colorChannels.green.push([]);
            colorChannels.blue.push([]);

            line.forEach(pixelValues => {
                colorChannels.red[indexLine].push(pixelValues[0]);
                colorChannels.green[indexLine].push(pixelValues[1]);
                colorChannels.blue[indexLine].push(pixelValues[2]);
            });
        });

        return colorChannels;
    }

    /**
     * @param {Image} image 
     * @param {boolean} minimal 
     * @returns {ImageSeparate}
     */
    static getImages(image, minimal) {
        const valueReplacement = minimal ? 0 : image.getIntensity();
        
        const pixelMatrix = image.getPixelMatrix();
        
        const pixelMatrixRed = ImageMatrizPixelModifier.modify(pixelMatrix, pixelValues => {
            return [pixelValues[0], valueReplacement, valueReplacement];
        });

        const pixelMatrixGreen = ImageMatrizPixelModifier.modify(pixelMatrix, pixelValues => {
            return [valueReplacement, pixelValues[1], valueReplacement];
        });

        const pixelMatrixBlue = ImageMatrizPixelModifier.modify(pixelMatrix, pixelValues => {
            return [valueReplacement, valueReplacement, pixelValues[2]];
        });

        return {
            red: Image.buildFromData(ImageType.PPM, image.getWidth(), image.getHeight(), image.getIntensity(), pixelMatrixRed),
            green: Image.buildFromData(ImageType.PPM, image.getWidth(), image.getHeight(), image.getIntensity(), pixelMatrixGreen),
            blue: Image.buildFromData(ImageType.PPM, image.getWidth(), image.getHeight(), image.getIntensity(), pixelMatrixBlue)
        };
    }
}

module.exports = ImageColorChannelSeparator;