const express = require('express');
var cors = require('cors')

const router = express.Router();

const { indexController } = require('../controllers/indexController');
const { altinController } = require('../controllers/altinController');
const { gumusController } = require('../controllers/gumusController');
const { borsaController } = require('../controllers/borsaController');
const { kriptoController } = require('../controllers/kriptoController');

router.get('/',cors(), indexController);
router.get('/altin',cors(), altinController);
router.get('/gumus',cors(), gumusController);
router.get('/borsa',cors(), borsaController);
router.get('/kriptopara',cors(), kriptoController);

module.exports = router;
