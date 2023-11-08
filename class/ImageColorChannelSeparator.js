const Image = require("./Image");

/**
 * @typedef {Object} ColorChannels
 * @property {Array<Array<number>>} red
 * @property {Array<Array<number>>} green
 * @property {Array<Array<number>>} blue
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
}

module.exports = ImageColorChannelSeparator;