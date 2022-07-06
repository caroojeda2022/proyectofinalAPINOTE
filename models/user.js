const DB = require('../connectDB.js');
const jwt = require('jsonwebtoken');
// const saltRounds = 14

const findById = async (id) => {
  let connection = await DB();
  let [rows, fields] = await connection.query(
    `
        SELECT * FROM USERS where id=${id}
        `
  );

  return rows[0];
};

const findByUsername = async (username) => {
  let connection = await DB();
  let [rows, fields] = await connection.query(
    `
        SELECT * FROM USERS where username='${username}'
        `
  );

  return rows[0];
};

const generateAuthToken = (userId) => {
  const payload = { uid: userId };
  return jwt.sign(
    payload, // payload
    'superSecureSecret', // secret encryption key
    { expiresIn: '1h', algorithm: 'HS256' } // options object
  );
};

const authenticate = async (username, password) => {
  const userFromDb = await findByUsername(username);
  console.log('a ver ', userFromDb);

  if (!userFromDb) return undefined;

  if (userFromDb.password != password) return undefined;

  return generateAuthToken(userFromDb.id);
};

const save = async (user) => {
  let connection = await DB();
  let [rows, fields] = await connection.query(
    `
        INSERT INTO notes_db.users (username, password)
        VALUES ('${user.username}', '${user.password}');
        `
  );
  return rows;
};

module.exports = {
  // findById,
  // findByUsername,
  authenticate,
  save,
};
