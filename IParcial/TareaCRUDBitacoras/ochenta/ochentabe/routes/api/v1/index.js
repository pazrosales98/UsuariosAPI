const express = require('express');
const router = express.Router();

const bitacorasRoutes = require('./bitacoras');

router.use('/bitacora', bitacorasRoutes);

module.exports = router;
