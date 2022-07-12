const getConnection = require('../db/getConnection');
const { generateError } = require('../helpers');

const noteExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    // Obtenemos id del nota.
    const { idNote } = req.params;

    const [note] = await connection.query(`SELECT id FROM note WHERE id = ?`, [
      idNote,
    ]);

    if (note.length < 1) {
      throw generateError('Nota no encontrado', 404);
    }

    // Saltamos al siguiente controlador.
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = noteExists;
