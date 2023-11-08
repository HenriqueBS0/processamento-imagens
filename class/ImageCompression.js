const Image = require("./Image");
const ImageColorChannelSeparator = require("./ImageColorChannelSeparator");
const repeat = require('./helpers/repeat');

class ImageCompression {

    /**
     * @param {String} compressedString
     * @returns {Image}
     */
    static decompress(compressedString) {
        const compressedArray = compressedString.split(' ');
        const width = parseInt(compressedArray[0]);
        const height = parseInt(compressedArray[1]);

        /**
         * @type {Array<String>}
         */
        const compressedPixels = compressedArray.slice(2);

        /**
         * @type {import("./ImageColorChannelSeparator").ColorChannels}
         */
        const colorChannels = {
            red: [],
            green: [],
            blue: []
        };


        let remainingElements = 0;
        let currentColor = 'red';
        let line = 0;

        const getFirstNumber = str => Number((str.match(/\d+/) || [0])[0]);

        /**
         * @param {*} inputString 
         * @returns {Array<Number>}
         */
        const extractArrayFromString = (inputString) => {
            const match = inputString.match(/\(([^)]+)\)/); // Encontra o que estiver entre parênteses
            return match[1].split(',').map(Number);
        }


        for (const value of compressedPixels) {
            remainingElements -= getFirstNumber(value);
            // const elements = getFirstNumber(value);
            // remainingElements -= elements;

            // if(!colorChannels[currentColor][line]) {
            //     colorChannels[currentColor][line] = [];
            // }

            // if(value.startsWith('-')) {
            //     extractArrayFromString(value).forEach(e => colorChannels[currentColor][line].push((e)));
            // }
            // else {
            //     repeat(() => colorChannels[currentColor][line].push(extractArrayFromString(value)[0]), elements);
            // }

            // if(remainingElements === 0) {
            //     currentColor = currentColor === 'red' ? 'green' : (currentColor === 'green' ? 'blue' : 'red');
            //     line = currentColor === 'red' ? line + 1 : line; 
            //     remainingElements = width;
            // }
        }

        console.log(colorChannels);
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