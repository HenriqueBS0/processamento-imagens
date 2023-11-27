const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageBitPlanner = require('./class/ImageBitPlanner');

const execute = async function() {

    const image = await ImageCreatorByContent.getFromTiff(fs.readFileSync('./img/Fig0314(a)(100-dollars).tif'));

    ImageBitPlanner.separete(image).forEach((image, planne) => {
        fs.writeFileSync(`./img/image-bit-planner/dollars-planne-${planne+1}.pbm`, image.getContent());
    });

    const joinImage = ImageBitPlanner.join([
        {
            plane: 8,
            image: ImageCreatorByContent.getImage(fs.readFileSync('./img/image-bit-planner/dollars-planne-8.pbm', 'utf-8')),
        },

        {
            plane: 7,
            image: ImageCreatorByContent.getImage(fs.readFileSync('./img/image-bit-planner/dollars-planne-7.pbm', 'utf-8')),
        },

        {
            plane: 6,
            image: ImageCreatorByContent.getImage(fs.readFileSync('./img/image-bit-planner/dollars-planne-6.pbm', 'utf-8')),
        },
    ]);

    fs.writeFileSync('./img/image-bit-planner/join.pgm', joinImage.getContent());
};

execute();