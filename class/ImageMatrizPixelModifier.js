class ImageMatrizPixelModifier {

    /**
     *
     * @param {Array<Array<Array<Number>>>} pixelMatriz
     * @param {function(Array<Number>): Array<Number>} callback
     * @returns {Array<Array<Array<Number>>>}
     */
    static modify(pixelMatriz, callback) {
        return pixelMatriz.map(line => line.map(callback));
    }

    /**
      *
      * @param {Array<Array<Array<Number>>>} pixelMatriz
      * @returns {Array<Array<Array<Number>>>}
      */
    static average(pixelMatriz) {
        return this.modify(
            pixelMatriz, 
            pixelValues => [Math.round(pixelValues.reduce((a, b) => a + b) / pixelValues.length)]
        );
    }

}

module.exports = ImageMatrizPixelModifier;