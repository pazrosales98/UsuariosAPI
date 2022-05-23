const express = require('express');
const router = express.Router();

const categoriesRouters = require('./categorias');

router.use('/categories',categoriesRouters);

module.exports = router;