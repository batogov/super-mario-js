import { Vector } from './math';

class Entity {
    constructor() {
        this.pos = new Vector(0, 0);
        this.vel = new Vector(0, 0);
    }
}

export default Entity;
