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
        const pixelMatriz = ImageMatrizPixelModifier.modify(image.getPixelMatriz(), pixelValues => {
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
            pixelMatriz
        );
    }
}

module.exports = ImageIntensityManipulator;