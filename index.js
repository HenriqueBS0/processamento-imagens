const fs = require('fs');
const ImageCreatorByContent = require('./class/ImageCreatorByContent');
const ImageColorChannelSeparator = require('./class/ImageColorChannelSeparator');

const image = ImageCreatorByContent.getImage(fs.readFileSync('./img/Fig1.ppm', 'utf-8'));

const minimalImages = ImageColorChannelSeparator.getImages(image, true);
const maximumImages = ImageColorChannelSeparator.getImages(image, false);

fs.writeFileSync('./img/color-channel-separator/min-r.ppm', minimalImages.red.getContent());
fs.writeFileSync('./img/color-channel-separator/min-g.ppm', minimalImages.green.getContent());
fs.writeFileSync('./img/color-channel-separator/min-b.ppm', minimalImages.blue.getContent());

fs.writeFileSync('./img/color-channel-separator/max-r.ppm', maximumImages.red.getContent());
fs.writeFileSync('./img/color-channel-separator/max-g.ppm', maximumImages.green.getContent());
fs.writeFileSync('./img/color-channel-separator/max-b.ppm', maximumImages.blue.getContent());