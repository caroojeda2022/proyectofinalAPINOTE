require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

//Variable para almacenar pool de conexiones
let pool;

//Función que retorna una conexión libre
const getConnection = async () => {
  try {
    //Crear un grupo de conexiones
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: 'Z',
      });
    }

    //Retorna 1 conexión libre
    return await pool.getConnection();
  } catch {
    throw new Error('Error al conexta con MySQL o base de datos no encontraba');
  }
};

//Exportamos la función
module.exports = getConnection;
