const DB = require('../connectDB.js');

const note = {
  id: Math.floor(Math.random()),
  titulo: 'Una nota espectacular',
  texto: 'Este seria el cuerpo de la nota',
  categoria: 'miscelaneo',
};

const findByUser = async (userId) => {
  let connection = await DB();
  let [rows, fields] = await connection.query(
    `
        SELECT * FROM notes where user_id='${userId}'
        `
  );

  return rows.map((note) => {
    return { id: note.id, titulo: note.titulo };
  });
};

const findById = async (noteId) => {
  let connection = await DB();
  let [rows, fields] = await connection.query(
    `
        SELECT * FROM notes where id='${noteId}'
        `
  );

  return rows[0];
};

const save = async (userId, titulo, texto, categoria) => {
  let connection = await DB();
  let [rows, fields] = await connection.query(
    `
        INSERT INTO notes_db.notes (titulo, texto, categoria, user_id)
        VALUES ('${titulo}', '${texto}', '${categoria}', '${userId}');
        `
  );
  return rows;
};

const update = async (toUpdate, userId) => {
  let connection = await DB();
  let [rows, fields] = await connection.query(
    `
        UPDATE notes_db.notes 
        SET titulo = '${toUpdate.titulo}', texto = '${toUpdate.texto}', categoria = '${toUpdate.categoria}'
        WHERE (id = '${toUpdate.id}')
        AND (user_id = '${userId}');
        `
  );
  console.log('rows: ', rows);
  console.log('fields: ', fields);
  return rows;
};

module.exports = {
  findByUser,
  findById,
  save,
  update,
};

