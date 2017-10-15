import { loadBackgroundSprites, loadMarioSprite } from './sprites';
import { createBackgroundLayer } from './layers';

import Compositor from './compositor';
import Entity from './entity';

import level from './../levels/1-1.json';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context);
    }
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites()
]).then(([marioSprite, backgroundSprites]) => {
    const comp = new Compositor();

    const gravity = 0.5;

    const mario = new Entity();
    mario.pos.set(64, 180);
    mario.vel.set(2, -10);

    mario.update = function updateMario() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    mario.draw = function drawMario() {
        marioSprite.draw('idle', context, this.pos.x, this.pos.y);
    }

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
