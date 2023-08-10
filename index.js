const fs = require('fs');
const ImageGenerator = require('./class/ImageGenerator');

fs.writeFileSync('./img/imagem-branco-preto.pbm', ImageGenerator.getImage(ImageGenerator.typeASCIIP1, 400, 400), (err) => {
    if (err) throw err;
  console.log('O arquivo foi criado!');
});

fs.writeFileSync('./img/imagem-cinza.pgm', ImageGenerator.getImage(ImageGenerator.typeASCIIP2, 400, 400, 16), (err) => {
  if (err) throw err;
console.log('O arquivo foi criado!');
});

fs.writeFileSync('./img/imagem-cinza.pgm', ImageGenerator.getImage(ImageGenerator.typeASCIIP2, 400, 400, 16), (err) => {
  if (err) throw err;
console.log('O arquivo foi criado!');
});

fs.writeFileSync('./img/imagem-colorida-400x400.pgm', ImageGenerator.getImage(ImageGenerator.typeASCIIP3, 400, 400, 16), (err) => {
  if (err) throw err;
console.log('O arquivo foi criado!');
});

fs.writeFileSync('./img/imagem-colorida-1000x1000.pgm', ImageGenerator.getImage(ImageGenerator.typeASCIIP3, 1000, 1000, 16), (err) => {
  if (err) throw err;
console.log('O arquivo foi criado!');
});

// console.log(gerarImagemP1(400, 400));