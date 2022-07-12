const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectAllNoteQuery = async (idUser, keyword) => {
  let connection;

  try {
    connection = await getConnection();

    let note;

    // Si hay palabra clave "keyword" buscamos las notas que contengan esa palabra
    // clave. De lo contrario retornamos todos las notas.
    if (keyword) {
      [note] = await connection.query(
        `
                    SELECT T.id, T.idUser, U.username, T.text, T.image, SUM(IFNULL(V.value = 1, 0)) AS likes, T.idUser = ? AS owner, BIT_OR(V.idUser = ? AND V.value = 1) AS likedByMe, T.createdAt
                    FROM note T
                    LEFT JOIN votes V 
                    ON T.id = V.idNote
                    LEFT JOIN users U
                    ON T.idUser = U.id
                    WHERE T.text LIKE ?
                    GROUP BY T.id
                    ORDER BY T.createdAt DESC
                `,
        [idUser, idUser, `%${keyword}%`]
      );
    } else {
      [note] = await connection.query(
        `
                    SELECT T.id, T.idUser, U.username, T.text, T.image, SUM(IFNULL(V.value = 1, 0)) AS likes, T.idUser = ? AS owner, BIT_OR(V.idUser = ? AND V.value = 1) AS likedByMe, T.createdAt
                    FROM note T
                    LEFT JOIN votes V 
                    ON T.id = V.idNote
                    LEFT JOIN users U
                    ON T.idUser = U.id
                    GROUP BY T.id
                    ORDER BY T.createdAt DESC
                `,
        [idUser, idUser]
      );
    }

    if (note.length < 1) {
      throw generateError('No se ha encontrado ninguna nota', 404);
    }

    return nota;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllNoteQuery;
