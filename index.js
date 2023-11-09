const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageCompression = require('./class/ImageCompression');

const image1 = ImageCreatorByContent.getImage(fs.readFileSync('./img/Fig1.ppm', 'utf-8'));
const image4 = ImageCreatorByContent.getImage(fs.readFileSync('./img/Fig4.ppm', 'utf-8'));

fs.writeFileSync('./img/compression/compress/compressFig1.rle', ImageCompression.compress(image1));
fs.writeFileSync('./img/compression/compress/compressFig4.rle', ImageCompression.compress(image4));

fs.writeFileSync('./img/compression/descompress/descompressFig1.ppm', ImageCompression.decompress(fs.readFileSync('./img/compression/compress/compressFig1.rle', 'utf-8')).getContent());
fs.writeFileSync('./img/compression/descompress/descompressFig4.ppm', ImageCompression.decompress(fs.readFileSync('./img/compression/compress/compressFig4.rle', 'utf-8')).getContent());