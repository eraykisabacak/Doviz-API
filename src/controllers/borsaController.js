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
  if (error || res.statusCode !== 200) {
    return errorResponse(res, "Server Error", 500);
  }

  try {
    const $ = cheerio.load(body);
    const allStocks = [];

    $(
      "#acik_koyu_yeri tbody .zebra, #acik_koyu_yeri2 tbody .zebra, #acik_koyu_yeri3 tbody .zebra"
    ).each(function (i, elem) {
      const stockData = $(this).text().trim();
      if (stockData !== "") {
        allStocks.push(stockData);
      }
    });

    const stocks = [];
    allStocks.forEach((stock) => {
      const [name, price, change, time] = stock.split(/\s+/);
      stocks.push({
        name: name,
        price: price,
        change: change,
        time: time,
      });
    });

    successResponse(res, stocks);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Parse Error", 500);
  }
};


module.exports = {
  borsaController,
  borsaAllController,
  borsa50Controller,
  borsa30Controller
};
