const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageHistogramManipulator = require('./class/ImageHistogramManipulator');

const fig1 = ImageCreatorByContent.getImage(fs.readFileSync('./img/Entrada_RGB.ppm', 'utf-8'));
const fig2 = ImageCreatorByContent.getImage(fs.readFileSync('./img/Fig2.ppm', 'utf-8'));

const fig1EQ = ImageHistogramManipulator.equalize(fig1);
const fig2EQ = ImageHistogramManipulator.equalize(fig2);

const fig1Realce = ImageHistogramManipulator.highlighting(fig1);
const fig2Realce = ImageHistogramManipulator.highlighting(fig2);
    
fs.writeFileSync('./img/histogram-multispectral/fig1-equalizada.ppm', fig1EQ.getContent());
fs.writeFileSync('./img/histogram-multispectral/fig2-equalizada.ppm', fig2EQ.getContent());

fs.writeFileSync('./img/histogram-multispectral/fig1-realcada.ppm', fig1Realce.getContent());
fs.writeFileSync('./img/histogram-multispectral/fig2-realcada.ppm', fig2Realce.getContent());