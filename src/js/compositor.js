class Compositor {
    constructor() {
        // Массив функций
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer(context);
        });
    }
}

export default Compositor;
