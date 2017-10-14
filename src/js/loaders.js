/**
 * Функция асинхронно загружает изображение по адресу.
 * @param {string} url Адрес изображения.
 */
function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export { loadImage };
