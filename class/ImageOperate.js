/**
 * @typedef {Object} Position
 * @property {Number} column
 * @property {Number} line
 */

/**
 * @callback OperationFunction
 * @param {import("./Image").PixelValues} operationFunction.pixelValuesA
 * @param {import("./Image").PixelValues} operationFunction.pixelValuesB
 * @returns {import("./Image").PixelValues}
 */

const Image = require("./Image");
const ImageIntensityManipulator = require("./ImageIntensityManipulator");

class ImageOperate {
    /**
     * @param {Image} imageA
     * @param {Image} imageB
     * @param {Position} position
     * @returns {Image} 
     */
    static addition(imageA, imageB, position) {
        return this.#operate(imageA, imageB, position, (pixelValuesA, pixelValuesB) => {
            return pixelValuesA.map((pixelValueA, index) => pixelValueA + pixelValuesB[index]);
        });
    }

    /**
     * @param {Image} imageA
     * @param {Image} imageB
     * @param {Position} position
     * @returns {Image} 
     */
    static subtraction(imageA, imageB, position) {
        return this.#operate(imageA, imageB, position, (pixelValuesA, pixelValuesB) => {
            return pixelValuesA.map((pixelValueA, index) => pixelValueA - pixelValuesB[index]);
        });
    }

    /**
     * Realiza uma operação entre duas imagens.
     *
     * @param {Image} imageA
     * @param {Image} imageB
     * @param {Position} position
     * @param {OperationFunction} operationFunction 
     * @returns {Image}
     */
    static #operate(imageA, imageB, position, operationFunction) {
        const pixelMatriz = Array.from({ length: imageA.getHeight() }, () =>
            Array(imageA.getWidth())
        );

        imageA.getPixelMatrix().forEach((line, indexLineA) => {
            line.forEach((_, indexColumnA) => {
                const isBeforeStartingPosition =
                    indexLineA < position.line || indexColumnA < position.column;
                const isAfterStartingFinalPosition =
                    indexLineA > position.line + imageB.getHeight() ||
                    indexColumnA > position.column + imageB.getWidth();
                const isNotOperate = isBeforeStartingPosition || isAfterStartingFinalPosition;

                if (isNotOperate) {
                    pixelMatriz[indexLineA][indexColumnA] =
                        imageA.getPixelMatrix()[indexLineA][indexColumnA];
                } else {
                    const indexLineB = indexLineA - position.line;
                    const indexColumnB = indexColumnA - position.column;

                    pixelMatriz[indexLineA][indexColumnA] = operationFunction(
                        imageA.getPixelMatrix()[indexLineA][indexColumnA],
                        imageB.getPixelMatrix()[indexLineB][indexColumnB]
                    );
                }
            });
        });

        return Image.buildFromData(
            imageA.getType(),
            imageA.getWidth(),
            imageA.getHeight(),
            ImageIntensityManipulator.getIntensityFromPixelMatrix(pixelMatriz),
            pixelMatriz
        );
    }
}

module.exports = ImageOperate;