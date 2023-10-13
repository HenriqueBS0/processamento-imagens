/**
 * @param {function} callback 
 * @param {Number} repetitions 
 */
module.exports = function (callback, repetitions) {
    for (let i = 0; i < repetitions; i++) {
        callback();
    }
}