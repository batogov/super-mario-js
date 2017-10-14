import SpriteSheet from './sprite-sheet';
import { loadImage } from './loaders';

import tiles from './../img/tiles.png';
import level from './../levels/1-1.json';

/**
 * Функция рисует тайлы бэкграунда.
 * @param {object} background Объект, который описывает тайлы бэкграунда.
 * @param {object} context Контекст рисования.
 * @param {SpriteSheet} spriteSheet Спрайт-лист с определёнными тайлами.
 */
function drawBackground(background, context, spriteSheet) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                spriteSheet.drawTile(background.tile, context, x, y);
            }
        }
    })
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage(tiles).then(image => {
    const spriteSheet = new SpriteSheet(image, 16, 16);

    spriteSheet.define('ground', 0, 0);
    spriteSheet.define('sky', 3, 23);

    level.backgrounds.forEach(background => {
        drawBackground(background, context, spriteSheet);
    });
})
