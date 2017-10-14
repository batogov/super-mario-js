import { loadBackgroundSprites, loadMarioSprite } from './sprites';
import Compositor from './compositor';

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

function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    }
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites()
]).then(([marioSprite, backgroundSprites]) => {
    const comp = new Compositor();

    const pos = {
        x: 64,
        y: 64
    }

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(marioSprite, pos);

    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);

        pos.x += 1;
        pos.y += 1;

        requestAnimationFrame(update);
    }

    update();
});
