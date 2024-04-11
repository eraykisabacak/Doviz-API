require('dotenv').config()

const cheerio = require('cheerio');
const request = require('request');

const BorsaFiyatlari = require('../models/BorsaFiyatlari');
const {errorResponse, successResponse} = require("../utils/ResponseHandler");
const { all } = require('../routers');

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

const borsaSembolController = function (req, res, next) {
  const stockSymbol = req.params.stock.toUpperCase();
  request(
    process.env.ALL_TURKISH_STOCK_SEMBOL_MARKET+stockSymbol,
    (error, response, body) => {
      dataParse2(error, response, body, res);
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
    const stocks = [];
    
    $(
      "#acik_koyu_yeri tbody .zebra, #acik_koyu_yeri2 tbody .zebra, #acik_koyu_yeri3 tbody .zebra"
    ).each(function (i, elem) {
      const stockData = $(this).text().trim();
      if (stockData !== "") {
        allStocks.push(stockData);
      }
    });

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

const dataParse2 = (error, response, body, res) => {
  if (error || res.statusCode !== 200) {
    return errorResponse(res, "Server Error", 500);
  }

  try {
    const $ = cheerio.load(body);
    const stocks = [];
    
    $("table.table3.table4 tbody tr").each(function (i, row) {
       const cells = $(row).find("td");
       const name = $(cells[0]).text().trim();
       const price = $(cells[1]).text().trim();
       const change = $(cells[3]).text().trim();

       if (name !== "" && price !== "") {
         stocks.push({ name, price, change});
       }
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
  borsa30Controller,
  borsaSembolController,
};
