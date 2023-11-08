const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageColorChannelSeparator = require('./class/ImageColorChannelSeparator');
const ImageCompression = require('./class/ImageCompression');

const image = ImageCreatorByContent.getImage(fs.readFileSync('./img/Fig4.ppm', 'utf-8'));

fs.writeFileSync('./img/compression/compress.rle', ImageCompression.compress(image));

console.log(ImageCompression.decompress(fs.readFileSync('./img/compression/compress.rle', 'utf-8')))