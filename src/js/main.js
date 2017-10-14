import { loadBackgroundSprites, loadMarioSprite } from './sprites';
import { createBackgroundLayer } from './layers';
import Compositor from './compositor';

import level from './../levels/1-1.json';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

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
