import SpriteSheet from './sprite-sheet';
import { loadImage } from './loaders';

import tiles from './../img/tiles.png';
import characters from './../img/characters.gif';

function loadBackgroundSprites() {
    return loadImage(tiles).then(image => {
        const spriteSheet = new SpriteSheet(image, 16, 16);
        spriteSheet.defineTile('ground', 0, 0);
        spriteSheet.defineTile('sky', 3, 23);
        return spriteSheet;
    });
}

function loadMarioSprite() {
    return loadImage(characters).then(image => {
        const spriteSheet = new SpriteSheet(image, 16, 16);
        spriteSheet.define('idle', 276, 44, 16, 16);
        return spriteSheet;
    });
}

export { loadBackgroundSprites, loadMarioSprite };
