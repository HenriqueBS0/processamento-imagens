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

        return [image.getWidth(), image.getHeight(), ...linesCompress].join(' ');
    }

    /**
     * @param {Array<Number>} line 
     */
    static #compressLine(line) {
        const lineCompress = [];

        let equals = [];
        let different = [];

        for (const pixelValue of line) {
            if(equals.length === 0 && different.length === 0) {
                different.push(pixelValue);
                continue;
            }

            if(different.length && different[different.length - 1] === pixelValue) {
                equals.push(different.pop(), pixelValue);

                if(different.length) {
                    lineCompress.push(JSON.parse(JSON.stringify(different)));
                }

                different = [];
                continue;
            }
            
            if(different.length) {
                different.push(pixelValue);
                continue;
            }

            if(equals[equals.length - 1] === pixelValue) {
                equals.push(pixelValue);
                continue;
            }

            lineCompress.push(JSON.parse(JSON.stringify(equals)));
            equals = [];
            different.push(pixelValue);
        }

        let a= lineCompress.map(elements => {
            if(elements.length > 1 && elements[0] === elements[1]) {
                return `${elements.length}(${elements[0]})`;
            }
            else {
                return `-${elements.length}(${elements.join(',')})`;
            }
        });

        const getFirstNumber = str => Number((str.match(/\d+/) || [0])[0]);

        let s = a.reduce((a, e) => {
            e = getFirstNumber(e);
            a + e;
        }, 0);
        
        return a;
    }
}

module.exports = ImageCompression;