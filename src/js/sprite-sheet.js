class SpriteSheet {
    constructor(image, tileWidth, tileHeight) {
        // Исходное изображение
        this.image = image;

        // Ширина и высота тайлов
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        // Коллекция определённых спрайтов
        this.sprites = new Map();
    }

    /**
     * Функция определяет в спрайт-листе новый спрайт.
     * @param {string} name Имя спрайта.
     * @param {number} x Координата спрайта по горизонтали в исходном изображении.
     * @param {number} y Координата по вертикали.
     * @param {number} width Ширина спрайта.
     * @param {number} width Высота спрайта.
     */
    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas');

        buffer.width = width;
        buffer.height = height;

        buffer.getContext('2d').drawImage(
            this.image,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height
        );

        this.sprites.set(name, buffer);
    }

    /**
     * Функция определяет в спрайт-листе новый тайл (спрайт с определённой
     * шириной и высотой).
     * @param {*} name Имя тайла.
     * @param {*} x Позиция тайла по горизонтали.
     * @param {*} y Позиция тайла по вертикали.
     */
    defineTile(name, x, y) {
        this.define(
            name,
            x * this.tileWidth,
            y * this.tileHeight,
            this.tileWidth,
            this.tileHeight
        );
    }

    /**
     * Функция рисует тайл из спрайт-листа.
     * @param {string} name Имя тайла.
     * @param {object} context Контекст рисования.
     * @param {number} x Позиция тайла по горизонтали.
     * @param {number} y Позиция тайла по вертикали.
     */
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.tileWidth, y * this.tileHeight);
    }

    draw(name, context, x, y) {
        const buffer = this.sprites.get(name);
        context.drawImage(buffer, x, y);
    }
}

export default SpriteSheet;
