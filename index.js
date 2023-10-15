const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageBitConverter = require('./class/ImageBitConverter');
const ImageIntensityManipulator = require('./class/ImageIntensityManipulator');

const image = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaEscalaCinza.pgm', 'utf-8'));

fs.writeFileSync(
    './img/intensity-manipulator/ganho-20.pgm', 
    ImageIntensityManipulator.increase(ImageBitConverter.convert(image, 5), 20).getContent()
);