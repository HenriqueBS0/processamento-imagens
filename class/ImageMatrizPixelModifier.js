class ImageMatrizPixelModifier {

    /**
     *
     * @param {import('./Image').PixelMatrix} pixelMatrix
     * @param {function(Array<Number>): Array<Number>} callback
     * @returns {import('./Image').PixelMatrix}
     */
    static modify(pixelMatrix, callback) {
        return pixelMatrix.map(line => line.map(callback));
    }

    /**
      *
      * @param {import('./Image').PixelMatrix} pixelMatrix
      * @returns {import('./Image').PixelMatrix}
      */
    static average(pixelMatrix) {
        return this.modify(
            pixelMatrix, 
            pixelValues => [Math.round(pixelValues.reduce((a, b) => a + b) / pixelValues.length)]
        );
    }

}

module.exports = ImageMatrizPixelModifier;