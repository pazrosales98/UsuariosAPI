const express = require('express');
const router = express.Router();

const categoriesRoutes = require('./categorias');
const bitacoraRoutes = require('./bitacora');

router.use('/categories', categoriesRoutes);
router.use('/bitacora', bitacoraRoutes);

module.exports = router;
