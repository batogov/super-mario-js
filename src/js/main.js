import { loadBackgroundSprites } from './sprites';
import { createBackgroundLayer, createSpriteLayer } from './layers';
import { createMario } from './entities';

import Compositor from './compositor';
import Entity from './entity';

import level from './../levels/1-1.json';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadBackgroundSprites()
]).then(([mario, backgroundSprites]) => {
    const comp = new Compositor();

    const gravity = 0.5;

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    const spriteLayer = createSpriteLayer(mario);

    comp.layers.push(backgroundLayer);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(context);

        mario.update();
        mario.vel.y += gravity;

        requestAnimationFrame(update);
    }

    update();
});
