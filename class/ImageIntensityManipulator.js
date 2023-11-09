const Image = require("./Image");
const ImageMatrizPixelModifier = require("./ImageMatrizPixelModifier");

class ImageIntensityManipulator {

    /** 
     * @param {Image} image 
     * @param {Number} percent 
     */
    static reduce(image, percent) {
        percent = percent <= 100 ? percent : 100;
        return this.#change(image, 1 - (percent / 100));
    }

    /** 
     * @param {Image} image 
     * @param {Number} percent 
     */
    static increase(image, percent) {
        return this.#change(image, 1 + (percent / 100));
    }

    /** 
     * @param {Image} image 
     * @param {Number} multiplier 
     */
    static #change(image, multiplier) {
        const pixelMatrix = ImageMatrizPixelModifier.modify(image.getPixelMatrix(), pixelValues => {
            return pixelValues.map(value => {
                return Math.round(value * multiplier) > image.getIntensity()
                    ? image.getIntensity()
                    : Math.round(value * multiplier)
            });
        });

        return Image.buildFromData(
            image.getType(),
            image.getWidth(),
            image.getHeight(),
            image.getIntensity(),
            pixelMatrix
        );
    }

    /**
     * @param {import("./Image").PixelMatrix} pixelMatrix 
     * @returns {Number}
     */
    static getIntensityFromPixelMatrix(pixelMatrix) {
        const nextBaseValue2 = number => {
            let pow = 0;
            while (Math.pow(2, pow) <= number) {
                pow++;
            }
            return Math.pow(2, pow);
        }


        /**
         * @param {import("./Image").PixelMatrix} pixelMatrix 
         */
        const getMaxValue = pixelMatrix => {
            let max = 0;

            pixelMatrix.forEach(line => {
                line.forEach(pixelValues => {
                    pixelValues.forEach(value => {
                        if(value > max) {
                            max = value;
                        };
                    })
                })
            });

            return max;
        }

        return nextBaseValue2(getMaxValue(pixelMatrix));
        
    }
}

module.exports = ImageIntensityManipulator;