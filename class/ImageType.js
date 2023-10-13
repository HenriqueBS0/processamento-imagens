/**
 * @module ImageType
 * @description Provides constants for different image types.
 */

/**
 * ImageType constant represents the available image types.
 * @typedef {object} ImageType
 * @property {string} PBM - Portable Bitmap (PBM)
 * @property {string} PGM - Portable Graymap (PGM)
 * @property {string} PPM - Portable Pixmap (PPM)
 * @readonly
 */

/**
 * ImageType object with the available image types.
 * @enum {ImageType}
 */
module.exports = class ImageType {
  /**
   * Portable Bitmap (PBM)
   * @const {string}
   */
  static get PBM() {
    return  'P1';
  }
  
  /**
   * Portable Graymap (PGM)
   * @const {string}
   */
  static get PGM() {
    return  'P2';
  }
  
  /**
   * Portable Pixmap (PPM)
   * @const {string}
   */
  static get PPM() {
    return  'P3';
  }

  /**
   * @param {String} type
   * @returns {Number}
   */
  static getValuesPerPixel(type) {
    return type === ImageType.PPM ? 3 : 1
  }
};
