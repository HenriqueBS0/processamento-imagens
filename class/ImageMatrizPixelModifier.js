class ImageMatrizPixelModifier {

    /**
     *
     * @param {Array<Array<Array<Number>>>} pixelMatrix
     * @param {function(Array<Number>): Array<Number>} callback
     * @returns {Array<Array<Array<Number>>>}
     */
    static modify(pixelMatrix, callback) {
        return pixelMatrix.map(line => line.map(callback));
    }

    /**
      *
      * @param {Array<Array<Array<Number>>>} pixelMatrix
      * @returns {Array<Array<Array<Number>>>}
      */
    static average(pixelMatrix) {
        return this.modify(
            pixelMatrix, 
            pixelValues => [Math.round(pixelValues.reduce((a, b) => a + b) / pixelValues.length)]
        );
    }

}

module.exports = ImageMatrizPixelModifier;