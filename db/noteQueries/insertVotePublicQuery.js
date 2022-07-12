const getConnection = require('../getConnection');

const insertVotePublicQuery = async (idUser, idNote) => {
  let connection;

  try {
    connection = await getConnection();

    const [note] = await connection.query(
      `SELECT value FROM votes WHERE idUser = ? AND idNote = ?`,
      [idUser, idNote]
    );

    if (tweets.length < 1) {
      await connection.query(
        `INSERT INTO votes (idUser, idNote, createdAt) VALUES (?, ?, ?)`,
        [idUser, idNote, new Date()]
      );

      return true;
    } else {
      await connection.query(
        `UPDATE votes SET value = ? WHERE idUser = ? AND idNote = ?`,
        [!note[0].value, idUser, idNote]
      );

      return !note[0].value;
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertVotePublicQuery;
