const PixelGenerator = require('./PixelGenerator');

class PixelGeneratorPGM extends PixelGenerator {
    /**
     * @param {Number} intensity 
     * @returns {string}
     */
    static getPixel(intensity) {
        return Math.floor(Math.random() * intensity);
    }
}

module.exports = PixelGeneratorPGM;