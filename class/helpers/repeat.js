/**
 * @param {(index: ?Number, args: Array<any>) => void} callback
 * @param {Number} repetitions 
 * @param {Array<any>} args 
 */
module.exports = function (callback, repetitions, args = []) {
    for (let i = 0; i < repetitions; i++) {
        callback(i, args);
    }
}
