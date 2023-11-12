const Image = require("./Image");
const ImageColorChannelSeparator = require("./ImageColorChannelSeparator");
const ImageType = require("./ImageType");

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

    /**
     * @param {Image} image
     * @returns {Image} 
     */
    static highlighting(image) {
        return image.getType() === ImageType.PPM
            ? this.#highlightingRGB(image)
            : this.#highlightingGray(image);
    }

    /**
     * @param {Image} image
     * @returns {Image} 
     */
    static #highlightingGray(image) {
        const channel = image.getPixelMatrix().map(line => line.map(pixelValues => pixelValues[0]));
        const highlightingChanel = this.#highlightingChanel(image.getIntensity(), channel);
        const pixelMatrix = highlightingChanel.map(line => line.map(pixelValue => [pixelValue]));

        return Image.buildFromData(image.getType(), image.getWidth(), image.getHeight(), image.getIntensity(), pixelMatrix);
    }

    /**
     * @param {Image} image
     * @returns {Image} 
     */
    static #highlightingRGB(image) {
        const colorChannels = ImageColorChannelSeparator.separate(image);

        colorChannels.red = this.#highlightingChanel(image.getIntensity(), colorChannels.red);
        colorChannels.green = this.#highlightingChanel(image.getIntensity(), colorChannels.green);
        colorChannels.blue = this.#highlightingChanel(image.getIntensity(), colorChannels.blue);

        const pixelMatrix = ImageColorChannelSeparator.join(colorChannels);

        return Image.buildFromData(image.getType(), image.getWidth(), image.getHeight(), image.getIntensity(), pixelMatrix);
    }

    /**
     * @param {Number} intensity 
     * @param {import("./Image").PixelChannel} channel 
     * @returns {import("./Image").PixelChannel}
     */
    static #highlightingChanel(intensity, channel) {
        let min = channel[0][0];
        let max = channel[0][0];

        channel.forEach(line => {
            line.forEach(pixelValue => {
                if(pixelValue > max) {
                    max = pixelValue;
                }
                if(pixelValue < min) {
                    min = pixelValue;
                }
            });
        });

        const a = Math.round(intensity/(max-min));
        const b = -(a*min);

        return channel.map(line => line.map(pixelValue => (a * pixelValue) + b));
    }

}

module.exports = ImageHistogramManipulator;