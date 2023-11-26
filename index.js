const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageRotate = require('./class/ImageRotate');

const image = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaRGB.ppm', 'utf-8'));

const image90 = ImageRotate.rotate90(image);
const image180 = ImageRotate.rotate180(image);

fs.writeFileSync('./img/rotate/90.ppm', image90.getContent());
fs.writeFileSync('./img/rotate/180.ppm', image180.getContent());