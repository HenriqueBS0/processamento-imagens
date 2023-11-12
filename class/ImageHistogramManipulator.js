const Image = require("./Image");
const ImageMatrizPixelModifier = require("./ImageMatrizPixelModifier");

class ImageHistogramManipulator {

    /**
     * @param {Image} image 
     * @returns {Array<Number>}
     */
    static getOrderedPixelValues(image) {
        const pixels = [];
        
        image.getPixelMatrix().forEach(line => {
            line.forEach(pixelValues => pixels.push(pixelValues[0]));
        });

        return pixels.sort((a,b) => a-b);
    }

    /**
     * @param {Image} image 
     * @returns {Object}
     * @property {Array<Number>} red
     * @property {Array<Number>} green
     * @property {Array<Number>} blue
     */
    static getOrderedPixelValuesRGB(image) {
        const pixels = [[],[],[]];
        
        image.getPixelMatrix().forEach(line => {
            line.forEach(pixelValues => {
                pixels[0].push(pixelValues[0]);
                pixels[1].push(pixelValues[1]);
                pixels[2].push(pixelValues[2]);
            });
        });

        return {
            red: pixels[0].sort((a,b) => a-b),
            green: pixels[1].sort((a,b) => a-b),
            blue: pixels[2].sort((a,b) => a-b),
        }
    }

}

module.exports = ImageHistogramManipulator;