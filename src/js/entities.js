import { loadMarioSprite } from './sprites';

import Entity from './entity';

function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity();
        mario.pos.set(64, 180);
        mario.vel.set(2, -10);

        mario.update = function updateMario() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }

        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        return mario;
    })
}

export { createMario };
