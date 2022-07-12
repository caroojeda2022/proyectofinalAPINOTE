const getConnection = require('../getConnection');

const selectNoteByIdQuery = async (idUser, idNote) => {
  let connection;

  try {
    connection = await getConnection();

    console.log(idNote);

    const [note] = await connection.query(
      `
                SELECT T.id, T.idUser, U.username, T.text, T.image, SUM(IFNULL(V.value = 1, 0)) AS likes,  T.idUser = ? AS owner, BIT_OR(V.idUser = ? AND V.value = 1) AS likedByMe, T.createdAt
                FROM note T
                LEFT JOIN votes V 
                ON T.id = V.idNote
                LEFT JOIN users U
                ON T.idUser = U.id
                WHERE T.id = ?
                GROUP BY T.id
            `,
      [idUser, idUser, idNote]
    );

    return note[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNoteByIdQuery;
