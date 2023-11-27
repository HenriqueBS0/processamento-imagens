const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageHistogramManipulator = require('./class/ImageHistogramManipulator');

const execute = async () => {
    const image1 = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0316(1)(top_left).tif'));
    const image2 = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0316(2)(2nd_from_top).tif'));
    const image3 = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0316(3)(third_from_top).tif'));
    const image4 = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0316(4)(bottom_left).tif'));

    fs.writeFileSync('./img/highlighting-by-histogram/fig1.pgm', ImageHistogramManipulator.highlighting(image1).getContent());
    fs.writeFileSync('./img/highlighting-by-histogram/fig2.pgm', ImageHistogramManipulator.highlighting(image2).getContent());
    fs.writeFileSync('./img/highlighting-by-histogram/fig3.pgm', ImageHistogramManipulator.highlighting(image3).getContent());
    fs.writeFileSync('./img/highlighting-by-histogram/fig4.pgm', ImageHistogramManipulator.highlighting(image4).getContent());
};

execute();