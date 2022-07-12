require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

app.use(fileUpload());

// Indicamos a express en que directorio están los archivos estáticos.
app.use(express.static('uploads'));

/**
 * #################
 * ## Middlewares ##
 * #################
 */
const Id = require('./middlewares/Id');
const User = require('./middlewares/User');
const IdUserOptional = require('./middlewares/IdUserOptional');
const note = require('./middlewares/note');

/**
 * ########################
 * ## Endpoints Usuarios ##
 * ########################
 */

const {
  Id,
  NewUser,
   idUser,
    getUser,
    getOwnUser,
    loginUser,
} = require('./controllers/users');

// Registrar un usuario.
app.post('/users', newUser);

// Registrar un usuario anónimo
app.post('/users', id);

// Registrar un usuario registrado
app.post('/users', IdUser);

// Información sobre un usuario.
app.get('/users/:idUser', getUser);

// Información sobre el usuario del token.
app.get('/users', idUser, getOwnUser);

// Login de usuario.
app.post('/login', loginUser);

/**
 * ######################
 * ## Endpoints Tweets ##
 * ######################
 */

const {
    newNote,
    listNote,
    getTNote,
    votePublicNote,
    deleteNote,
} = require('./controllers/Note');

// Crear una Nota.
app.post('/note', idUser, newNote);

// Listar todos las Notas.
app.get('/note', idUserOptional, listNote);

// Información sobre una nota.
app.get('/note/:idNote', idUserOptional, noteExists, getTweet);

// Hacer publica una Nota.
app.post('/note/:idNote/votes', idUser, noteExists, votePublicNote);

// Borrar una nota.
app.delete('/note/:idNote', idUser, noteExists, deleteNote);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`);
});
