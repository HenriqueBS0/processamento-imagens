const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageResizer = require('./class/ImageResizer');

const image = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaEscalaCinza.pgm', 'utf-8'));

fs.writeFileSync('./img/redimensionamento/10x-menor.pgm', ImageResizer.resize(image, 80, 80).getContent());
fs.writeFileSync('./img/redimensionamento/480x320.pgm', ImageResizer.resize(image, 480, 320).getContent());
fs.writeFileSync('./img/redimensionamento/1280x720.pgm', ImageResizer.resize(image, 1280, 720).getContent());
fs.writeFileSync('./img/redimensionamento/1920x1080.pgm', ImageResizer.resize(image, 1920, 1080).getContent());
fs.writeFileSync('./img/redimensionamento/3840x2160.pgm', ImageResizer.resize(image, 3840, 2160).getContent());
fs.writeFileSync('./img/redimensionamento/7680x4320.pgm', ImageResizer.resize(image, 7680, 4320).getContent());
