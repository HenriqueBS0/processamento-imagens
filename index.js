const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageFormatConverter = require('./class/ImageFormatConverter');
const ImageNegativeConverter = require('./class/ImageNegativeConverter');

const image = ImageCreatorByContent.getImage(fs.readFileSync('./img/EntradaEscalaCinza.pgm', 'utf-8'));

fs.writeFileSync(
    './img/black-white/limiar-128.pbm',
    ImageFormatConverter.toPBM(image, 128).getContent()
);

fs.writeFileSync(
    './img/black-white/limiar-135.pbm',
    ImageFormatConverter.toPBM(image, 135).getContent()
);

fs.writeFileSync(
    './img/black-white/negativo-128.pbm',
    ImageNegativeConverter.toNegative(ImageFormatConverter.toPBM(image, 128)).getContent()
);