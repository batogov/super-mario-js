import tiles from './../img/tiles.png';

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage(tiles).then(image => {
    context.drawImage(image, 0, 0);
})
