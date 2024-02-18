require('dotenv').config()

const cheerio = require('cheerio');
const request = require('request');

const BorsaFiyatlari = require('../models/BorsaFiyatlari');
const {errorResponse, successResponse} = require("../utils/ResponseHandler");

const borsaController = function (req, res, next) {
  request(
    process.env.ALL_TURKISH_STOCK_100_MARKET,
    (error, response, body) => {
      dataParse(error, response, body, res)
    }
  );
};

const borsaAllController = function (req, res, next) {
  request(
    process.env.ALL_TURKISH_STOCK_MARKET,
    (error, response, body) => {
      dataParse(error, response, body, res)
    }
  );
};

const borsa50Controller = function (req, res, next) {
  request(
    process.env.ALL_TURKISH_STOCK_50_MARKET,
    (error, response, body) => {
      dataParse(error, response, body, res)
    }
  );
};

const borsa30Controller = function (req, res, next) {
  request(
    process.env.ALL_TURKISH_STOCK_30_MARKET,
    (error, response, body) => {
      dataParse(error, response, body, res)
    }
  );
};

const dataParse = (error, response, body, res) => {
  var allStocks = [];
  if (error || res.statusCode !== 200) return errorResponse(res, 'Server Error', 500);

      try {
          let $ = cheerio.load(body);

          $('#acik_koyu_yeri tbody .zebra').each(function (i, elem) {
              if ($(this).text() !== null && $(this).text() !== '')
                  allStocks[i] = $(this).text();
          });

          $('#acik_koyu_yeri2 tbody .zebra').each(function (i, elem) {
              if ($(this).text() !== null && $(this).text() !== '')
                  allStocks.push($(this).text());
          });

          $('#acik_koyu_yeri3 tbody .zebra').each(function (i, elem) {
              if (
                  $(this).text() !== null &&
                  $(this).text() !== '' &&
                  $(this).text() !== ' '
              )
                  allStocks.push($(this).text());
          });

          var borsaName = [];
          var borsaZaman = [];
          var borsa = [];

          for (var i = 0; i < allStocks.length; i++) {
              borsaName.push(allStocks[i].match(/([a-zA-Z])\w+/g));
              borsa.push(allStocks[i].match(/[-]?([0-9]+,)\w+/g));
              borsaZaman.push(allStocks[i].match(/(\d{2}):(\d{2}):(\d{2})/g));
          }

          var borsaFiyat = [];
          var borsaDegisim = [];

          var borsa = borsa.filter(function (el) {
              return el != null;
          });

          for (var i = 0; i < borsa.length; i++) {
              borsaFiyat.push(borsa[i][0]);
              borsaDegisim.push(borsa[i][1]);
              borsaZaman.push(borsa[i][5]);
          }

          borsaName.splice(0, 1);
          borsaName.splice(34, 1);
          borsaName.splice(68, 1);

          var borsaZaman = borsaZaman.filter(function (el) {
              return el != null;
          });

          var result = [];
          for (var i = 0; i < borsaName.length; i++) {
              borsaObject = new BorsaFiyatlari(
                  Array.isArray(borsaName[i]) ? borsaName[i].toString() : borsaName[i],
                  borsaFiyat[i],
                  borsaDegisim[i],
                  Array.isArray(borsaZaman[i]) ? borsaZaman[i].toString() : borsaZaman[i],
              );
              result.push(borsaObject);
          }
          successResponse(res, result);
      }catch (error){
          console.log(error)
          return errorResponse(res, 'Parse Error', 500);
      }
}


module.exports = {
  borsaController,
  borsaAllController,
  borsa50Controller,
  borsa30Controller
};
