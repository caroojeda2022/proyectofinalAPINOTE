const express = require('express');
const router = express.Router();
const note = require('../models/note.js');
const auth = require('../middlewares/auth.js');
// const user = require("../models/user.js");

router.use('/', auth);

//Ver su listado de notas (en el listado sólo se ven los títulos)
router.get('/', async (req, res) => {
  const userId = req.user._id;
  const notes = await note.findByUser(userId);
  let formattedNotes = notes.map((note) => {
    return { id: note.id, titulo: note.titulo };
  });
  res.send({ notas: formattedNotes });
});

//Crear una nota: título, texto y categoría única (fijas).
router.post('/', async (req, res) => {
  const { titulo, texto, categoria } = req.body;
  const userId = req.user._id;
  let savedNote = note.save(userId, titulo, texto, categoria);

  if (!savedNote) throw Error('fallo el guardado');
  res.send({ notas: [savedNote] });
});

//Visualizar una nota
router.get('/:noteId', async (req, res) => {
  const noteFromDb = await note.findById(req.params.noteId);
  if (!noteFromDb) throw Error('nota no encontrada');
  res.send({ notas: [noteFromDb] });
});

//Modificar sus notas: título, texto y categoría
router.patch('/:noteId', async (req, res) => {
  const { id, ...otrosAtributos } = req.body;
  const userId = req.user._id;
  const updatedNote = await note.update(
    {
      id: note.id,
      ...otrosAtributos,
    },
    userId
  );

  res.send({ notas: [updatedNote] });
});

module.exports = router;

