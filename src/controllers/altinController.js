const cheerio = require('cheerio');
const request = require('request');

const AltinFiyatlari = require('../models/AltinFiyatlari');
const {errorResponse, successResponse} = require("../utils/ResponseHandler");

const altinController = function (req, res, next) {
  var altinDovizler = [];
  request(
    'https://uzmanpara.milliyet.com.tr/altin-fiyatlari/',
    (error, response, body) => {
        if (error || res.statusCode !== 200) return errorResponse(res, 'Server Error', 500);

      try{
          let $ = cheerio.load(body);

          $('.detL table tbody tr td').each(function (i, elem) {
              if ($(this).text() !== null && $(this).text() !== '')
                  altinDovizler[i] = $(this).text();
          });

          var Altin = new AltinFiyatlari(
              altinDovizler[2],
              altinDovizler[3],
              altinDovizler[4],
              altinDovizler[5]
          );
          var Bilezik22Ayar = new AltinFiyatlari(
              altinDovizler[8],
              altinDovizler[9],
              altinDovizler[10],
              altinDovizler[11]
          );
          var AltinOns = new AltinFiyatlari(
              altinDovizler[14],
              altinDovizler[15],
              altinDovizler[16],
              altinDovizler[17]
          );
          var HasAltinGram = new AltinFiyatlari(
              altinDovizler[20],
              altinDovizler[21],
              altinDovizler[22],
              altinDovizler[23]
          );
          var AltinKGDolar = new AltinFiyatlari(
              altinDovizler[26],
              altinDovizler[27],
              altinDovizler[28],
              altinDovizler[29]
          );
          var AltinKGEuro = new AltinFiyatlari(
              altinDovizler[32],
              altinDovizler[33],
              altinDovizler[34],
              altinDovizler[35]
          );
          var CumhuriyetAltin = new AltinFiyatlari(
              altinDovizler[38],
              altinDovizler[39],
              altinDovizler[40],
              altinDovizler[41]
          );
          var TamAltin = new AltinFiyatlari(
              altinDovizler[44],
              altinDovizler[45],
              altinDovizler[46],
              altinDovizler[47]
          );
          var YarimAltin = new AltinFiyatlari(
              altinDovizler[50],
              altinDovizler[51],
              altinDovizler[52],
              altinDovizler[53]
          );
          var CeyrekAltin = new AltinFiyatlari(
              altinDovizler[56],
              altinDovizler[57],
              altinDovizler[58],
              altinDovizler[59]
          );

          successResponse(res, {
              Altin,
              Bilezik22Ayar,
              AltinOns,
              HasAltinGram,
              AltinKGDolar,
              AltinKGEuro,
              CumhuriyetAltin,
              TamAltin,
              YarimAltin,
              CeyrekAltin,
          });
      }catch (error){
          return errorResponse(res, 'Parse Error', 500);
      }
    }
  );
};

module.exports = {
  altinController,
};
