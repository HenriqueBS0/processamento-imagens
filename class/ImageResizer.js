const Image = require("./Image");
const repeat = require('./helpers/repeat');

class ImageResizer {

    /**
     * @param {Image} image
     * @param {Number} width
     * @param {Number} height
     * @returns {Image}
     */
    static resize(image, width, height) {

        /**
         * @type {import('./Image').PixelMatrix}
         */
        let pixelMatrix = JSON.parse(JSON.stringify(image.getPixelMatrix()));

        pixelMatrix = this.#enlarge(pixelMatrix, image.getWidth(), image.getHeight(), width, height);
        pixelMatrix = this.#reduce(pixelMatrix, image.getWidth(), image.getHeight(), width, height);

        return Image.buildFromData(image.getType(), width, height, image.getIntensity(), pixelMatrix);
    }

    /**
     * @param {import('./Image').PixelMatrix} matriz
     * @param {Number} currentWidth
     * @param {Number} currentHeight
     * @param {Number} targetWidth
     * @param {Number} targetHeight
     * @returns {Array<Array<Array<<Number>>>}
     */
    static #reduce(matriz, currentWidth, currentHeight, targetWidth, targetHeight) {
        if (currentWidth > targetWidth) {
            matriz = matriz.map(line => this.#reduceArray(line, targetWidth));
        }
        if (currentHeight > targetHeight) {
            matriz = this.#transposeMatrix(matriz);
            matriz = matriz.map(column => this.#reduceArray(column, targetHeight));
            matriz = this.#transposeMatrix(matriz);
        }

        return matriz;
    }

    /**
     * @param {Array<Array<Number>>} array
     * @param {Number} length
     * @returns {Array<Array<Number>>}
     */
    static #reduceArray(array, length) {

        const reduceByTheAveragePixel = array => {

            const mediumPixel = Math.floor(array.length / 2) - 1;

            array[mediumPixel] = this.#pixelAverage([array[mediumPixel], array[mediumPixel + 1]]);
            array.splice(mediumPixel + 1, 1);

            return array;
        }

        const divideIntoTwo = array => {
            const middleIndex = Math.floor(array.length / 2);

            return { left: array.slice(0, middleIndex), right: array.slice(middleIndex) };
        }

        const pixelsToReduce = array.length - length;

        let parts = [array];
        let numberPreviousParts = 0;

        while (parts.length !== numberPreviousParts && parts.length !== pixelsToReduce) {
            numberPreviousParts = parts.length;
            const newParts = [];

            while (parts.length !== 0) {

                const part = parts.shift();

                if ([2, 3].includes(part.length)) {
                    newParts.push(part);
                    continue;
                }

                const { left, right } = divideIntoTwo(part);

                newParts.push(left, right);

                if (newParts.length + parts.length === pixelsToReduce) {
                    newParts.push(...parts);
                    break;
                }
            }

            parts = newParts;
        }

        const newArray = [];

        parts.forEach(part => newArray.push(...reduceByTheAveragePixel(part)));

        return newArray.length === length ? newArray : this.#reduceArray(newArray, length);
    }

    /**
     * @param {import('./Image').PixelMatrix} array
     * @param {Number} proportionToOne
     * @returns {Array<Array<Array<<Number>>>}
     */
    static #enlarge(matriz, currentWidth, currentHeight, targetWidth, targetHeight) {
        if (currentWidth < targetWidth) {
            matriz = matriz.map(line => this.#enlargeArray(line, targetWidth));
        }

        if (currentHeight < targetHeight) {
            matriz = this.#transposeMatrix(matriz);
            matriz = matriz.map(column => this.#enlargeArray(column, targetHeight));
            matriz = this.#transposeMatrix(matriz);
        }

        return matriz;
    }

    /**
     * @param {Array<Array<Number>>} array
     * @param {Number} targetLength
     * @returns {Array<Array<Number>>}
     */
    static #enlargeArray(array, targetLength) {
        const insertSpaces = array.length - 1;
        const pixelsToInsert = targetLength - array.length;

        if (pixelsToInsert === 0) {
            return array;
        }

        if (pixelsToInsert >= insertSpaces) {
            return this.#enlargeArray(this.#insertPixelsInAllSpaces(array), targetLength);
        }

        return this.#insertPixelsBetweenSection(array, pixelsToInsert);
    }

    /**
     * @param {Array<Array<Number>>} array
     * @returns {Array<Array<Number>>}
     */
    static #insertPixelsInAllSpaces(array) {
        const newArray = [];

        for (let index = 0; index < (array.length - 1); index++) {
            newArray.push(array[index]);
            newArray.push(this.#pixelAverage([array[index], array[index + 1]]));
        }

        newArray.push(array[array.length - 1]);

        return newArray;
    }

    /**
     * @param {Array<Array<Number>>} array
     * @returns {Array<Array<Number>>}
     */
    static #insertPixelsBetweenSection(array, pixelsToInsert) {

        const getNumberSessions = (pixels, pixelsToInsert) => {
            let denominator = pixelsToInsert;

            while (pixels % denominator !== 0) {
                denominator--;
            }

            return pixels / (pixels / denominator);
        }

        const sessions = getNumberSessions(array.length, pixelsToInsert);
        const pixelsPerSession = array.length / sessions;
        const remainingPixels = pixelsToInsert - sessions;

        const newArray = [];
        let indexFirstPixel = 0;
        let indexLastPixel = pixelsPerSession - 1;
        let indexMediumPixel = indexLastPixel - (Math.floor(pixelsPerSession / 2));

        repeat(() => {
            array.slice(indexFirstPixel, indexMediumPixel + 1).forEach(pixel => newArray.push(pixel));
            newArray.push(this.#pixelAverage([array[indexMediumPixel], array[indexMediumPixel + 1]]));
            array.slice(indexMediumPixel + 1, indexLastPixel + 1).forEach(pixel => newArray.push(pixel));

            indexFirstPixel += pixelsPerSession;
            indexLastPixel += pixelsPerSession;
            indexMediumPixel += pixelsPerSession;
        }, sessions);

        if (remainingPixels === 0) {
            return newArray;
        }

        return this.#insertPixelsBetweenSection(newArray, remainingPixels);
    }

    /**
     * @param {Array<Array<Number>>} pixels
     * @returns {Array<Number>}
     */
    static #pixelAverage(pixels) {
        return pixels.reduce((pixelValue, currentPixelValue) => {
            pixelValue.forEach((value, index) => {
                pixelValue[index] = Math.round((value + currentPixelValue[index]) / 2);
            });

            return pixelValue;
        });
    }

    static #transposeMatrix(matrix) {
        const rows = matrix.length;
        const columns = matrix[0].length;

        const transposedMatrix = Array(columns)
            .fill(null)
            .map(() => Array(rows));

        for (let originalRow = 0; originalRow < rows; originalRow++) {
            for (let originalColumn = 0; originalColumn < columns; originalColumn++) {
                const originalValue = matrix[originalRow][originalColumn];
                transposedMatrix[originalColumn][originalRow] = originalValue;
            }
        }

        return transposedMatrix;
    }
}

module.exports = ImageResizer;