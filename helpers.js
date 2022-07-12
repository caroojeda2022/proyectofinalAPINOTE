const fs = require('fs/promises');
const path = require('path');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createPathIfNotExists = async (path) => {
    try {
        // Intentamos acceder al directorio.
        await fs.access(path);
    } catch {
        // Si no es posible acceder al directorio en el "try" se
        // lanzaría un error. Si es así creamos el directorio.
        await fs.mkdir(path);
    }
};

const deletePhoto = async (photoName) => {
    try {
        // Creamos la ruta absoluta a la foto.
        const photoPath = path.join(__dirname, 'uploads', photoName);

        // Eliminamos la foto del disco.
        await fs.unlink(photoPath);
    } catch {
        throw new Error('Error al eliminar la imagen del servidor');
    }
};

module.exports = {
    generateError,
    createPathIfNotExists,
    deletePhoto,
};

