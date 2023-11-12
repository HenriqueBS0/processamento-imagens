const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageHistogramManipulator = require('./class/ImageHistogramManipulator');

const gray = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaEscalaCinza.pgm', 'utf-8'));
const rgb = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaRGB.ppm', 'utf-8'));

const highlightingGray = ImageHistogramManipulator.highlighting(gray);
const highlightingRgb = ImageHistogramManipulator.highlighting(rgb);

fs.writeFileSync('./img/highlighting-by-histogram/gray.pgm', highlightingGray.getContent());
fs.writeFileSync('./img/highlighting-by-histogram/rgb.ppm', highlightingRgb.getContent());