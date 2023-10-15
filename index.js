const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageResizer = require('./class/ImageResizer');
const ImageIntensityChanger = require('./class/ImageIntensityChanger');

const image = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaEscalaCinza.pgm', 'utf-8'));

fs.writeFileSync('./img/bit-change/saida-5-bits.pgm', ImageIntensityChanger.change(image, 5).getContent());