const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageColorChannelSeparator = require('./class/ImageColorChannelSeparator');
const ImageOperate = require('./class/ImageOperate');

const imageA = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaRGB.ppm', 'utf-8'));
const imageB = ImageColorChannelSeparator.getImages(imageA, true).green;

const additionImage = ImageOperate.addition(imageA, imageB, {column: 0, line: 0});
const subtractionImage = ImageOperate.subtraction(imageA, imageB, {column: 0, line: 0});

fs.writeFileSync('./img/image-operate/additionImage.ppm', additionImage.getContent());
fs.writeFileSync('./img/image-operate/subtractionImage.ppm', subtractionImage.getContent());