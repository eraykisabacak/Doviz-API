const express = require('express');
var cors = require('cors')

const router = express.Router();

const { indexController } = require('../controllers/indexController');
const { altinController } = require('../controllers/altinController');
const { gumusController } = require('../controllers/gumusController');
const { borsaController,
        borsaAllController,
        borsa50Controller,
        borsa30Controller,
        borsaSembolController,
        indicesController,
        highestIndexController,
        lowestIndexController
} = require('../controllers/borsaController');

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get all data
 *     description: Returns all data
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/',cors(), indexController);
/**
 * @swagger
 * /api/altin:
 *   get:
 *     summary: Get gold data
 *     description: Returns gold data
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/altin',cors(), altinController);
/**
 * @swagger
 * /api/gumus:
 *   get:
 *     summary: Get silver data
 *     description: Returns silver data
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/gumus',cors(), gumusController);
/**
 * @swagger
 * /api/borsa:
 *   get:
 *     summary: Get stock market data
 *     description: Returns stock market data
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/borsa',cors(), borsaController);
/**
 * @swagger
 * /api/borsaAll:
 *   get:
 *     summary: Get all stock market data
 *     description: Returns all stock market data
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/borsaAll',cors(), borsaAllController);
/**
 * @swagger
 * /api/borsa50:
 *   get:
 *     summary: Get all stock market data
 *     description: Returns all stock market data
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/borsa50',cors(), borsa50Controller);
/**
 * @swagger
 * /api/borsa30:
 *   get:
 *     summary: Get all stock market data
 *     description: Returns all stock market data
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/borsa30',cors(), borsa30Controller);
/**
 * @swagger
 * /api/indices:
 *   get:
 *     summary: Get all prices of Borsa Istanbul indexes. (XU100, XSTKR, XGIDA)
 *     description: Returns all prices of Borsa Istanbul indexes. (XU100, XSTKR, XGIDA)
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/indices',cors(), indicesController);
/**
 * @swagger
 * /api/highest:
 *   get:
 *     summary: Get high index prices of Borsa Istanbul indexes.
 *     description: Returns high index prices of Borsa Istanbul indexes.
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The page number for pagination
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/highest',cors(), highestIndexController);
/**
 * @swagger
 * /api/lowest:
 *   get:
 *     summary: Get low index prices of Borsa Istanbul indexes.
 *     description: Returns low index of Borsa Istanbul indexes.
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The page number for pagination
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/lowest',cors(), lowestIndexController);
/**
 * @swagger
 * /api/{stock}:
 *   get:
 *     summary: Get stock market data for a specific stock
 *     description: Returns stock market data for the specified stock symbol
 *     parameters:
 *       - in: path
 *         name: stock
 *         required: true
 *         description: Stock symbol
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/:stock', cors(), borsaSembolController);

module.exports = router;
