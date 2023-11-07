const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageIntensityManipulator = require('./class/ImageIntensityManipulator');
const ImageFormatConverter = require('./class/ImageFormatConverter');
const ImageNegativeConverter = require('./class/ImageNegativeConverter');
const ImageResizer = require('./class/ImageResizer');
const ImageBitConverter = require('./class/ImageBitConverter');
const Image = require('./class/Image');
const ImageType = require('./class/ImageType');
const ImageMatrizPixelModifier = require('./class/ImageMatrizPixelModifier');

const image = ImageCreatorByContent.getImage(fs.readFileSync('./img/Fig4.ppm', 'utf-8'));

const grayImage = ImageFormatConverter.toPGM(image, image.getBits());

const pixelMatriz = ImageMatrizPixelModifier.modify(grayImage.getPixelMatriz(), pixelValues => [pixelValues[0], pixelValues[0], pixelValues[0]]);

const averageImage = Image.buildFromData(
    ImageType.PPM,
    grayImage.getWidth(),
    grayImage.getHeight(),
    grayImage.getIntensity(),
    pixelMatriz
)

fs.writeFileSync(
    './img/media-converter/saida-escala-cinza.pgm',
    grayImage.getContent()
);

fs.writeFileSync(
    './img/media-converter/saida-media.ppm',
    averageImage.getContent()
);