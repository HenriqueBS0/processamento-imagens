const Image = require("./Image");
const ImageColorChannelSeparator = require("./ImageColorChannelSeparator");
const ImageIntensityManipulator = require("./ImageIntensityManipulator");
const ImageType = require("./ImageType");
const repeat = require('./helpers/repeat');

class ImageCompression {

    /**
     * @param {String} compressedString
     * @returns {Image}
     */
    static decompress(compressedString) {
        const compressedArray = compressedString.split(',');
        const width = Number(compressedArray.at(0));
        const height = Number(compressedArray.at(1));
        const compressedArrayPixels = compressedArray.slice(2);

        /**
         * @type {import("./ImageColorChannelSeparator").ColorChannels}
         */
        const colorChannels = {
            red: [],
            green: [],
            blue: [],
        }

        let color = 'red';
        const getColor = currentColor => currentColor === 'green' ? 'blue' : (currentColor === 'red' ? 'green' : 'red');

        let valuesChannel = [];

        for (let index = 0; index < compressedArrayPixels.length; index++) {
            const element = compressedArrayPixels[index];
            const differentValues =  element.startsWith('-');
            const counter = Math.abs(element);

            if(differentValues) {
                repeat(() => {
                    index++;
                    valuesChannel.push(Number(compressedArrayPixels[index]));
                }, counter);
            }
            else {
                index++;
                repeat(() => valuesChannel.push(Number(compressedArrayPixels[index])), counter);
            }

            if(valuesChannel.length === width) {
                colorChannels[color].push(valuesChannel.slice());
                valuesChannel = [];
                color = getColor(color);
            }
        }

        const pixelMatrix = [];

        repeat(line => {
            pixelMatrix.push([]);

            repeat(pixelIndex => {
                pixelMatrix[line].push([
                    colorChannels.red[line][pixelIndex],
                    colorChannels.green[line][pixelIndex],
                    colorChannels.blue[line][pixelIndex],
                ]);

            }, width);

        }, height);

        return Image.buildFromData(
            ImageType.PPM,
            width,
            height,
            ImageIntensityManipulator.getIntensityFromPixelMatrix(pixelMatrix),
            pixelMatrix
        );
    }

    /**
     * @param {Image} image 
     */
    static compress(image) {
        const colorChannels = ImageColorChannelSeparator.separate(image);

        let linesCompress = [];

        for (let line = 0; line < image.getHeight(); line++) {
            linesCompress = linesCompress.concat(this.#compressLine(colorChannels.red[line]));
            linesCompress = linesCompress.concat(this.#compressLine(colorChannels.green[line]));
            linesCompress = linesCompress.concat(this.#compressLine(colorChannels.blue[line]));
        }

        return [image.getWidth(), image.getHeight(), ...linesCompress].join(',');
    }

    /**
     * @param {Array<Number>} line 
     */
    static #compressLine(line) {

        const getSubsequences = line => {

            const subsequences = [];

            let bringingTogetherDifferent = true;
            let subsequence = [];

            for (const pixelValue of line) {

                if (subsequence.length === 0) {
                    subsequence.push(pixelValue);
                    continue;
                }

                if (subsequence.length === 1) {
                    bringingTogetherDifferent = subsequence[0] !== pixelValue;
                }

                if (
                    (bringingTogetherDifferent && subsequence.at(-1) !== pixelValue) ||
                    (!bringingTogetherDifferent && subsequence.at(-1) === pixelValue)
                ) {
                    subsequence.push(pixelValue);
                }
                else {
                    subsequences.push(JSON.parse(JSON.stringify(subsequence)));
                    subsequence = [pixelValue];
                }
            }

            subsequences.push(JSON.parse(JSON.stringify(subsequence)));
            return subsequences;
        }

        const divide127 = subsequences => {
            const newSubsequences = [];

            for (const subsequence of subsequences) {
                if (subsequence.length <= 127) {
                    newSubsequences.push(subsequence);
                    continue;
                }

                while (subsequence.length > 127) {
                    const newSubsequence = [];
                    repeat(() => newSubsequence.push(subsequence.shift()), 127);
                    newSubsequences.push(newSubsequence);
                }

                newSubsequences.push(subsequence);
            }

            return newSubsequences;
        }

        return divide127(getSubsequences(line)).map(subsequence => {
            if (subsequence.length > 1 && subsequence[0] === subsequence[1]) {
                return `${subsequence.length},${subsequence[0]}`;
            }
            else {
                return `${-subsequence.length},${subsequence.join(',')}`;
            }
        });

    }
}

module.exports = ImageCompression;