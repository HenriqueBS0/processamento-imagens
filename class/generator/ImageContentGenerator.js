const Image = require("../Image");
const ImageType = require('../ImageType');
const PixelGeneratorPBM = require('./pixel/PixelGeneratorPBM');
const PixelGeneratorPGM = require('./pixel/PixelGeneratorPGM');
const PixelGeneratorPPM = require('./pixel/PixelGeneratorPPM');

class ImageContentGenerator {

    /**
     * @param {Image} image 
     * @returns {string}
     */
    static getContent(image) {
        const lines = [];

        for (let line = 0; line < image.getHeight(); line++) {
            
            const pixels = [];
            
            for (let pixel = 0; pixel < image.getWidth(); pixel++) {
                pixels.push(this.#generatePixel(image));
            }

            lines.push(pixels.join(' '));
        }
    
        return [image.getType(), `${image.getWidth()} ${image.getHeight()} ${image.getIntensity() - 1}`, lines.join('\n')].join('\n');
    }

    /**
     * @param {Image} image 
     * @returns {string}
     */
    static #generatePixel(image) {
        const generatePixelFunctions = {
            [ImageType.PBM] : PixelGeneratorPBM.getPixel,
            [ImageType.PGM] : PixelGeneratorPGM.getPixel,
            [ImageType.PPM] : PixelGeneratorPPM.getPixel,
        };

        return generatePixelFunctions[image.getType()](image.getIntensity());
    }
}

module.exports = ImageContentGenerator;