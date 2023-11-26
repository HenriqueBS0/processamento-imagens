const Image = require("./Image");

class ImageRotate {
    /**
     * @param {Image} image
     * @returns {Image} 
     */
    static rotate90(image) {
        const pixelMatrix = image.getPixelMatrix();
        const pixelMatrixRotate = [];

        for (let i = 0; i < image.getWidth(); i++) {
            pixelMatrixRotate[i] = [];
            for (let j = 0; j < image.getHeight(); j++) {
                pixelMatrixRotate[i][j] = pixelMatrix[j][i];
            }
        }

        return Image.buildFromData(
            image.getType(),
            image.getHeight(),
            image.getWidth(),
            image.getIntensity(),
            pixelMatrixRotate
        );
    }

    /**
     * @param {Image} image
     * @returns {Image} 
     */
    static rotate180(image) {
        return Image.buildFromData(
            image.getType(),
            image.getWidth(),
            image.getHeight(),
            image.getIntensity(),
            image.getPixelMatrix().map(line => line.reverse()).reverse()
        );
    }
}

module.exports = ImageRotate;