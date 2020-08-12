const express = require('express');

const router = express.Router();

const {
  indexController,
  altinController,
  gumusController,
  borsaController,
} = require('../controllers/borsaController');

router.get('/', indexController);
router.get('/altin', altinController);
router.get('/gumus', gumusController);
router.get('/borsa', borsaController);

module.exports = router;
