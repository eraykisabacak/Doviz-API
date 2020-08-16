const express = require('express');

const router = express.Router();

const { borsaController } = require('../controllers/borsaController');

const { gumusController } = require('../controllers/gumusController');

const { altinController } = require('../controllers/altinController');

const { indexController } = require('../controllers/indexController');

router.get('/', indexController);
router.get('/altin', altinController);
router.get('/gumus', gumusController);
router.get('/borsa', borsaController);

module.exports = router;
