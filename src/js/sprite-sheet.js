class SpriteSheet {
    constructor(image, width, height) {
        // Исходный спрайт
        this.image = image;

        // Ширина и высота тайлов
        this.width = width;
        this.height = height;

        // Коллекция определённых тайлов
        this.tiles = new Map();
    }

    /**
     * Функция определяет в спрайт-листе новый тайл.
     * @param {string} name Имя тайла.
     * @param {number} x Позиция тайла по горизонтали в исходном спрайте.
     * @param {number} y Позиция по вертикали.
     */
    define(name, x, y) {
        const buffer = document.createElement('canvas');

        buffer.width = this.width;
        buffer.height = this.height;

        buffer.getContext('2d').drawImage(
            this.image,
            x * this.width,
            y * this.height,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height
        );

        this.tiles.set(name, buffer);
    }

    /**
     * Функция рисует тайл из спрайт-листа.
     * @param {string} name Имя тайла.
     * @param {object} context Контекст рисования.
     * @param {number} x Координата по горизонтали.
     * @param {number} y Координата по вертикали.
     */
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }

    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }
}

export default SpriteSheet;
