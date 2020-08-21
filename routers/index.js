const express = require('express');

const router = express.Router();

const { indexController } = require('../controllers/indexController');
const { altinController } = require('../controllers/altinController');
const { gumusController } = require('../controllers/gumusController');
const { borsaController } = require('../controllers/borsaController');
const { kriptoController } = require('../controllers/kriptoController');

router.get('/', indexController);
router.get('/altin', altinController);
router.get('/gumus', gumusController);
router.get('/borsa', borsaController);
router.get('/kriptopara', kriptoController);

module.exports = router;
