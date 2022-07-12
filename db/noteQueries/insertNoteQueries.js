const getConnection = require('../getConnection');

const insertNoteQuery = async (idUser, text, image = '') => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
                INSERT INTO note (idUser, text, image, createdAt)
                VALUES (?, ?, ?, ?)
            `,
      [idUser, text, image, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNoteQuery;
