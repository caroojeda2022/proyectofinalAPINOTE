const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const insertNoteQuery = require('../../db/noteQueries/insertNoteQuery');

const { generateError, createPathIfNotExists } = require('../../helpers');

const newNote = async (req, res, next) => {
  try {
    const { text } = req.body;

    // Si el texto de la nota, no existe o supera los 240 caracteres lanzamos un error.
    if (!text || text.length > 240) {
      throw generateError(
        'Falta el texto o la longitud de la nota supera los 240 caracteres',
        400
      );
    }

    // Variable donde almacenaremos el nombre de la imagen.
    let imgName;

    // Si la imagen existe la guardamos.
    if (req.files && req.files.image) {
      // Creamos una ruta absoluta al directorio de descargas.
      const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

      // Creamos el directorio si no existe.
      await createPathIfNotExists(uploadsDir);

      // Procesa la imagen y la convierte en un objeto tipo "Sharp".
      const sharpImg = sharp(req.files.image.data);

      // Redimensionar la imagen a 300px de ancho.
      sharpImg.resize(300);

      // Generar un nombre único para la imagen.
      imgName = `${nanoid(24)}.jpg`;

      // Generar la ruta absoluta a la imagen.
      const imgPath = path.join(uploadsDir, imgName);

      // Guardar la imagen en el directorio de descargas.
      await sharpImg.toFile(imgPath);
    }

    // Agregar la nota.
    insertNoteQuery(req.idUser, text, imgName);

    res.send({
      status: 'ok',
      message: 'Nota creada',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newNote;
