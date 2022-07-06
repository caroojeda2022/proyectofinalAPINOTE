const express = require('express');
const router = express.Router();

const user = require('../models/user.js');

//Login: usando email + contraseña
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const token = await user.authenticate(username, password);

  if (!token) throw Error('User not found');

  res.send({
    token: token,
  });
});

//Registro: pide email + contraseña
router.post('/register', async (req, res) => {
  console.log('metodo de registro funcionando');

  const { username, password } = req.body;

  const savedUser = await user.save({ username, password });
  console.log(savedUser);
  res.send('ok');
});

module.exports = router;

