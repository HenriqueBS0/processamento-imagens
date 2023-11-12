const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageHistogramManipulator = require('./class/ImageHistogramManipulator');
const repeat = require('./class/helpers/repeat');

const cinza = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaEscalaCinza.pgm', 'utf-8'));
const colorida = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaRGB.ppm', 'utf-8'));

fs.writeFileSync('./img/data-histogram/data-cinza.csv', ImageHistogramManipulator.getOrderedPixelValues(cinza).join('\n'));

const dataColorida = ImageHistogramManipulator.getOrderedPixelValuesRGB(colorida);

const arrayColorida = [];

repeat(
    i => arrayColorida.push(`${dataColorida.red[i]},${dataColorida.green[i]},${dataColorida.blue[i]}`), 
    colorida.getWidth() * colorida.getHeight()
);


fs.writeFileSync(
    './img/data-histogram/data-colorida.csv', 
    arrayColorida.join('\n')
);