const cheerio = require('cheerio');
const request = require('request');

const AltinFiyatlari = require('../models/AltinFiyatlari');
const {errorResponse, successResponse} = require("../utils/ResponseHandler");

const gumusController = function (req, res, next) {
  var gumusDovizler = [];
  request(
    'https://uzmanpara.milliyet.com.tr/altin-fiyatlari/',
    (error, response, body) => {
      if (error || res.statusCode !== 200) return errorResponse(res, 'Server Error', 500);

      let $ = cheerio.load(body);

      try{
          $('.detL table tbody tr td').each(function (i, elem) {
              if ($(this).text() !== null && $(this).text() !== '')
                  gumusDovizler[i] = $(this).text();
          });

          var GumusGramSpot = new AltinFiyatlari(
              gumusDovizler[62],
              gumusDovizler[63],
              gumusDovizler[64],
              gumusDovizler[65]
          );
          var Gumus = new AltinFiyatlari(
              gumusDovizler[68],
              gumusDovizler[69],
              gumusDovizler[70],
              gumusDovizler[71]
          );
          var GumusEuro = new AltinFiyatlari(
              gumusDovizler[74],
              gumusDovizler[75],
              gumusDovizler[76],
              gumusDovizler[77]
          );
          var GumusGramDolar = new AltinFiyatlari(
              gumusDovizler[80],
              gumusDovizler[81],
              gumusDovizler[82],
              gumusDovizler[83]
          );
          var GumusGramTurkLirasi = new AltinFiyatlari(
              gumusDovizler[86],
              gumusDovizler[87],
              gumusDovizler[88],
              gumusDovizler[89]
          );

          successResponse(res, {
              GumusGramSpot,
              Gumus,
              GumusEuro,
              GumusGramDolar,
              GumusGramTurkLirasi,
          });
      }catch(error){
          return errorResponse(res, 'Parse Error', 500);
      }
    }
  );
};

module.exports = {
  gumusController,
};
