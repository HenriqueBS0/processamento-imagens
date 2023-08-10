class ImageGenerator {
    static typeASCIIP1 = 'P1';
    static typeASCIIP2 = 'P2';
    static typeASCIIP3 = 'P3';

    static getImage(typeASCII, width, height, intensity = 2) {
        const lines = [];

        for (let line = 0; line < height; line++) {
            
            const pixels = [];
            
            for (let pixel = 0; pixel < width; pixel++) {
                pixels.push(this.#generatePixelFromTypeASCII(typeASCII, intensity));
            }

            lines.push(pixels.join(' '));
        }
    
        return [typeASCII, `${width} ${height} ${intensity - 1}`, lines.join('\n')].join('\n');
    }

    static #generatePixelFromTypeASCII(typeASCII, intensity) {
        switch (typeASCII) {
            case this.typeASCIIP1:
                return Math.floor(Math.random() * intensity);
            case this.typeASCIIP2:
                return Math.floor(Math.random() * intensity);
            case this.typeASCIIP3:
                return `${Math.floor(Math.random() * intensity)} ${Math.floor(Math.random() * intensity)} ${Math.floor(Math.random() * intensity)}`;
        }
    }
}

module.exports = ImageGenerator;