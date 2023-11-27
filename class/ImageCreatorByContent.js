const Image = require('./Image');
const ImageIntensityManipulator = require('./ImageIntensityManipulator');
const ImageType = require('./ImageType');

const { Image: ImageJS } = require('image-js');

class ImageCreatorByContent {

    /**
     * @param {String} content
     * @returns {Promise<Image>}
     */
    static async getFromTiff(content) {
        const imageTIFF = await ImageJS.load(content);

        const type = imageTIFF.channels === 1 ? ImageType.PGM : ImageType.PPM;

        const pixelMatrix = [];
        const pixelsArray = imageTIFF.getPixelsArray();
        let indexValuesPixel = 0;

        for (let indexLine = 1; indexLine <= imageTIFF.height; indexLine++) {
            const pixelsLine = [];

            for (let pixelValues = 1; pixelValues <= imageTIFF.width; pixelValues++) {
                pixelsLine.push(pixelsArray[indexValuesPixel].slice().map(Number));
                indexValuesPixel++;
            }

            pixelMatrix.push(pixelsLine);
        }

        return Image.buildFromData(type, imageTIFF.width, imageTIFF.height, ImageIntensityManipulator.getIntensityFromPixelMatrix(pixelMatrix), pixelMatrix);
    }

    /**
     * @param {String} content
     */
    static getImage(content) {
        const contentArray = this.#converToArray(content);

        const type = contentArray[0];
        const width = Number(contentArray[1]);
        const height = Number(contentArray[2]);
        const intensity = Number(contentArray[3]);

        return new Image(type, width, height, intensity).setContent(contentArray.join('\n'));
    }

    /**
     * @param {String} content
     * @returns {Array<String>}
     */
    static #converToArray(content) {
        const contentWithoutBreaks = content.replace(/#.*(\r?\n|\r|$)/g, ' ').replace(/\r?\n|\r/g, ' ');
        const contentArray = contentWithoutBreaks.split(' ').filter(elemento => elemento !== '');
        return this.#explainsIntensity(contentArray);
    }

    /**
     * @param {Array<String>} content
     * @returns {Array<String>}
     */
    static #explainsIntensity(content) {

        const type = content[0].toUpperCase();
        const width = Number(content[1]);
        const height = Number(content[2]);

        const valuesPerPixel = ImageType.getValuesPerPixel(type);

        const intensity = this.#getIntensity(content, width, height, valuesPerPixel);
        const pixelData = this.#getPixelData(content, width, height, valuesPerPixel);

        const contentArray = [];

        contentArray.push(type);
        contentArray.push(width);
        contentArray.push(height);
        contentArray.push(intensity);

        pixelData.forEach(line => {
            line.forEach(value => {
                contentArray.push(value);
            });
        });

        return contentArray;
    }

    /**
     * @param {Array<String>} content
     * @param {Number} width
     * @param {Number} height
     * @param {Number} valuesPerPixel
     * @returns {import('./Image').PixelMatrix}
     */
    static #getPixelData(content, width, height, valuesPerPixel) {
        const contentReverse = content.slice().reverse();

        const pixelData = [];

        let indexPixel = 0;

        const pixelsPerLine = (width * valuesPerPixel);

        for (let line = 1; line <= height; line++) {
            const pixelsLine = [];

            for (let pixelLine = 1; pixelLine <= pixelsPerLine; pixelLine++) {

                pixelsLine.push(Number(contentReverse[indexPixel]));

                indexPixel++;
            }

            pixelData.push(pixelsLine.reverse());
        }

        return pixelData.reverse();
    }

    /**
     * @param {Array<String>} content
     * @param {Number} width
     * @param {Number} height
     * @param {Number} valuesPerPixel
     * @returns {Number}
     */
    static #getIntensity(content, width, height, valuesPerPixel) {
        let highestIntensityBetweenPixels = 0;

        const contentReverse = content.slice().reverse();

        const valuesPixel = (width * valuesPerPixel) * height;

        for (let index = 0; index < valuesPixel; index++) {
            const pixelValue = Number(contentReverse[index]);

            if(pixelValue > highestIntensityBetweenPixels) {
                highestIntensityBetweenPixels = pixelValue;
            }
        }

        if((valuesPixel + 4) === content.length && (highestIntensityBetweenPixels <= Number(content[3]))) {
            return Number(content[3]);
        }

        return highestIntensityBetweenPixels;
    }
}

module.exports = ImageCreatorByContent;