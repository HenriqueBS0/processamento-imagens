const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageHistogramManipulator = require('./class/ImageHistogramManipulator');

const execute = async () => {
    const image1 = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0316(1)(top_left).tif'));
    const image2 = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0316(2)(2nd_from_top).tif'));
    const image3 = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0316(3)(third_from_top).tif'));
    const image4 = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0316(4)(bottom_left).tif'));

    fs.writeFileSync('./img/histogram-equalization/fig1.pgm', ImageHistogramManipulator.equalize(image1).getContent());
    fs.writeFileSync('./img/histogram-equalization/fig2.pgm', ImageHistogramManipulator.equalize(image2).getContent());
    fs.writeFileSync('./img/histogram-equalization/fig3.pgm', ImageHistogramManipulator.equalize(image3).getContent());
    fs.writeFileSync('./img/histogram-equalization/fig4.pgm', ImageHistogramManipulator.equalize(image4).getContent());
};

execute();