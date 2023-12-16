const cheerio = require('cheerio');
const request = require('request');

const Kripto = require('../models/Kripto');
const {errorResponse, successResponse} = require("../utils/ResponseHandler");

const kriptoController = function (req, res, next) {
  var kriptoParalar = [];
  request('https://coinmarketcap.com/', (error, response, body) => {
    if (error || res.statusCode !== 200) return errorResponse(res, 'Server Error', 500);

    try {
      let $ = cheerio.load(body);
      var kriptoSatir = [];

      var kriptoSira = [];
      var kriptoName = [];
      var kriptoImage = [];
      var kriptoSembol = [];
      var kriptoMarketCap = [];
      var kriptoFiyat = [];
      var kriptoDurum = [];
      var kriptoDurum7d = [];
      var kriptoVolume = [];
      var kriptoCirculating = [];
      var kriptoChange = [];
      var kriptoChange7d = [];

      $('tbody tr td').each(function (i, elem) {
        if (
            $(this).text() !== null &&
            $(this).text() !== ' ' &&
            $(this).text() !== ''
        )
          kriptoSatir.push($(this).html());
      });

      for (var i = 0; i < 80; i += 8) {
        var tempTD = cheerio.load(kriptoSatir[i]);
        kriptoSira.push(tempTD('p').text());


        var tempTD = cheerio.load(kriptoSatir[i + 1]);
        kriptoName.push(tempTD('a div div p').html());

        kriptoImage.push(tempTD('a div img').attr('src'));

        kriptoSembol.push(tempTD('a div div div p').text());

        var tempTD = cheerio.load(kriptoSatir[i + 2]);
        kriptoFiyat.push(tempTD('a').text());

        var tempTD = cheerio.load(kriptoSatir[i + 3]);

        const durum7d = tempTD('span').attr('class');

        if (durum7d.includes('upColor')) {
          kriptoChange7d.push('+' + tempTD('span').text());
          kriptoDurum7d.push('+');
        } else {
          kriptoChange7d.push('-' + tempTD('span').text());
          kriptoDurum7d.push('-');
        }

        var tempTD = cheerio.load(kriptoSatir[i + 4]);
        const durum = tempTD('span').attr('class');

        if (durum.includes('upColor')) {
          kriptoChange.push('+' + tempTD('span').text());
          kriptoDurum.push('+');
        } else {
          kriptoChange.push('-' + tempTD('span').text());
          kriptoDurum.push('-');
        }


        var tempTD = cheerio.load(kriptoSatir[i + 5]);
        kriptoMarketCap.push(tempTD('p').text());

        var tempTD = cheerio.load(kriptoSatir[i + 6]);
        kriptoVolume.push(tempTD('div a p').text());

        var tempTD = cheerio.load(kriptoSatir[i + 7]);
        kriptoCirculating.push(tempTD('div div p').text());
      }

      var result = [];
      for (var i = 0; i < kriptoSira.length; i++) {
        kriptoObject = new Kripto(
            kriptoSira[i],
            kriptoName[i],
            kriptoImage[i],
            kriptoSembol[i],
            kriptoMarketCap[i],
            kriptoFiyat[i],
            kriptoDurum[i],
            kriptoDurum7d[i],
            kriptoVolume[i],
            kriptoCirculating[i],
            kriptoChange[i],
            kriptoChange7d[i]
        );
        result.push(kriptoObject);
      }
      successResponse(res, result);
    }catch (error){
      return errorResponse(res, 'Parse Error', 500);
    }
  });
};

module.exports = { kriptoController };
