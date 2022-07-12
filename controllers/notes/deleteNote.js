const selectNoteByIdQuery = require('../../db/noteQueries/selectNotetByIdQuery');
const deleteNoteQuery = require('../../db/noteQueries/deleteNoteQuery');

const { generateError, deletePhoto } = require('../../helpers');

const deleteNote = async (req, res, next) => {
  try {
    const { idNote } = req.params;

    const { idUser } = req;

    // Obtenemos la info de la nota que queremos borrar.
    const note = await selectNoteByIdQuery(idUser, idNote);

    // Si el id de la nota no coincide con el id del token, se lanza un error.
    if (idUser !== note.idUser) {
      throw generateError('No tienes suficientes permisos', 401);
    }

    // Si la nota tiene vinculada una imagen la obtenemos.
    if (note.image) {
      await getPhoto(note.image);
    }

    await deleteNoteQuery(idNote);

    res.send({
      status: 'ok',
      message: 'nota eliminada',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteNote;
