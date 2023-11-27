const Image = require("./Image");
const ImageIntensityManipulator = require("./ImageIntensityManipulator");
const ImageType = require("./ImageType");

/**
 * @typedef {Object} ImageBitPlanerItem
 * @property {Number} plane
 * @property {Image} image 
 */

class ImageBitPlaner {

    /**
     * @param {Image} image
     * @returns {Array<Image>}
     */
    static separete(image) {
        const channel = image.getPixelMatrix().map(line => line.map(pixelValues => pixelValues[0]));
        const pixelMatrices = this.#getPixelMatricesChannel(channel, image.getBits());

        return pixelMatrices.map(pixelMatrix => {
            return Image.buildFromData(
                ImageType.PBM,
                image.getWidth(),
                image.getHeight(),
                1,
                pixelMatrix
            );
        });
    }

    /**
     * @param {Array<ImageBitPlanerItem>} images
     * @returns {Image}
     */
    static join(images) {
        const width = images.at(0).image.getWidth();
        const height = images.at(0).image.getHeight();

        const pixelMatrix = Array.from({ length: height }, () => {
            return Array.from({ length: width }, () => [0]);
        });

        pixelMatrix.forEach((line, indexLine) => {
            line.forEach((pixelValues, indexValue) => {
                pixelValues.forEach((_, indexChannel) => {
                    images.forEach(imageBitPlanerItem => {
                        pixelMatrix[indexLine][indexValue][indexChannel]
                            += (2 ^ imageBitPlanerItem.plane) * imageBitPlanerItem.image.getPixelMatrix()[indexLine][indexValue][indexChannel];
                    });
                });
            });
        });

        return Image.buildFromData(
            ImageType.PGM,
            width,
            height,
            ImageIntensityManipulator.getIntensityFromPixelMatrix(pixelMatrix),
            pixelMatrix
        );
    }

    /**
     * @param {import("./Image").PixelChannel} channel
     * @param {Number} bits 
     * @returns {Array<import("./Image").PixelChannel>} 
     */
    static #getPixelMatricesChannel(channel, bits) {
        const pixelMatrices = Array.from({ length: bits }, () => []);

        channel.forEach((line, lineIndex) => {
            pixelMatrices.forEach(pixelMatrix => pixelMatrix.push([]));

            line.forEach(pixelValue => {
                for (let plane = 0; plane < bits; plane++) {
                    pixelMatrices[plane][lineIndex].push([this.#getBitPixelValue(plane, pixelValue, bits)]);
                }
            });
        });

        return pixelMatrices;
    }

    /**
     * @param {Number} plane 
     * @param {Number} pixelValue
     * @param {Number} bits 
     */
    static #getBitPixelValue(plane, pixelValue, bits) {
        return parseInt((pixelValue).toString(2).padStart(bits, '0')[bits - (plane + 1)]);
    }
}

module.exports = ImageBitPlaner;