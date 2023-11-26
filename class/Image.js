const ImageType = require("./ImageType");

/**
 * @typedef {Array<Array<Number>>} PixelChannel
 */

/**
 * @typedef {Array<Number>} PixelValues
 */

/**
 * @typedef {Array<PixelValues>} PixelLine
 */

/**
 * @typedef {Array<PixelLine>} PixelMatrix
 */

class Image {
    #type;
    #width;
    #height;
    #intensity;
    #content;
    #pixelMatrix;

    /**
     * @param {string} type 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} intensity 
     */
    constructor(type, width, height, intensity) {
        this.#setType(type);
        this.#setWidth(width);
        this.#setHeight(height);
        this.#setIntensity(intensity);
    }

    #setType(type) {
        this.#type = type;
        return this;
    }

    #setWidth(width) {
        this.#width = width;
        return this;
    }

    #setHeight(height) {
        this.#height = height;
        return this;
    }

    #setIntensity(intensity) {
        this.#intensity = intensity;
        return this;
    }

    setContent(content) {
        this.#content = content;
        this.#setPixelMatrix(content);
        return this;
    }

    /**
     * @param {String} content 
     */
    #setPixelMatrix(content) {
        const contentArray = content.split('\n');

        const pixelMatrix = [];

        let indexPixel = 4;

        const valuesPerPixel = ImageType.getValuesPerPixel(this.getType());

        for (let line = 1; line <= this.getHeight(); line++) {
            const pixelsLine = [];
            
            for (let pixelLine = 1; pixelLine <= this.getWidth(); pixelLine++) {

                const valuesPixel = [];

                for(let valuePixel = 1; valuePixel <= valuesPerPixel; valuePixel++) {
                    valuesPixel.push(Number(contentArray[indexPixel]));
                    indexPixel++;
                }

                pixelsLine.push(valuesPixel);
            }

            pixelMatrix.push(pixelsLine);
        }

        this.#pixelMatrix = pixelMatrix;
    }

    getType() {
        return this.#type;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getIntensity() {
        return this.#intensity;
    }

    getBits() {
        return Math.log2(this.getIntensity() + 1);
    }

    getContent() {
        return this.#content;
    }

    /**
     * @returns {Array<Array<Array<Number>>>}
     */
    getPixelMatrix() {
        return this.#pixelMatrix.slice();
    }

    /**
     * 
     * @param {String} type 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Number} intensity 
     * @param {PixelMatrix} pixelMatrix 
     */
    static buildFromData(type, width, height, intensity, pixelMatrix) {
        const content = [];
        content.push(type);
        content.push(width);
        content.push(height);
        content.push(intensity);
        
        pixelMatrix.forEach(line => {
            line.forEach(pixelsValues => {
                pixelsValues.forEach(value => {
                    content.push(value);
                });
            });
        });

        return new Image(type, width, height, intensity).setContent(content.join('\n'));
    }
}

module.exports = Image;