var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {Nombre: 'Carlos Rosales', ID: '0501199811318'});
});

module.exports = router;