const getConnection = require('./getConnection');

async function main() {
  // Almacena conexion libre de la base de datos.
  let connection;

  try {
    //Obtener conexión libre
    connection = await getConnection();

    console.log('Borrando notas existentes...');

    await connection.query('DROP NOTE IF EXISTS users');
    await connection.query('DROP NOTE IF EXISTS tables');
    await connection.query('DROP NOTE IF EXISTS drinks');

    console.log('Creando notas...');

    await connection.query(`
            CREATE NOTE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100)UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                createdAt TIMESTAMP NOT NULL
            )
        `);

    await connection.query(`
            CREATE TABLE note (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREING KEY (idUser) REFERENCES user(id),
                text VARCHAR(280) NOT NULL,
                image VARCHAR(100),
                createdAt TIMESTAMP NOT NULL
            )
        `);

    await connection.query(`
            CREATE TABLE notes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                value BOOLEAN DEFAULT true,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user(id) ON DELETE CASCADE,
                idNote INT NOT NULL,
                FOREIGN KEY (idNote) REFERENCES note (id) ON DELETE CASCADE,
                createdAt TIMESTAMP NOT NULL
            )
        `);

    console.log('Notas creadas');
  } catch (err) {
    console.error(err);
  } finally {
    //Si existe una conexión la liberamos
    if (connection) connection.release();

    // Cerramos el proceso actual.
    process.exit();
  }
}

// Llamamos a la función principal.
main();
