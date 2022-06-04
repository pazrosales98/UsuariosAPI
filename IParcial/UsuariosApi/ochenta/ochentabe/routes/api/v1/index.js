const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarios');

router.use('/usuario', usuariosRoutes);

module.exports = router;
