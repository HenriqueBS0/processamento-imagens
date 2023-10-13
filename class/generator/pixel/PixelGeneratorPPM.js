const PixelGenerator = require('./PixelGenerator');

class PixelGeneratorPPM extends PixelGenerator {
    /**
     * @param {Number} intensity 
     * @returns {string}
     */
    static getPixel(intensity) {
        return [
            (Math.floor(Math.random() * intensity)),
            (Math.floor(Math.random() * intensity)),
            (Math.floor(Math.random() * intensity))
        ].join(' ');
    }
}

module.exports = PixelGeneratorPPM;