const cheerio = require('cheerio');
const request = require('request');

const Kripto = require('../models/Kripto');

const kriptoController = function (req, res, next) {
  var kriptoParalar = [];
  request('https://coinmarketcap.com/', (error, response, body) => {
    if (error && res.statusCode == 200) return console.error(error);

    let $ = cheerio.load(body);
    var kriptoSatir = [];

    var kriptoSira = [];
    var kriptoName = [];
    var kriptoMarketCap = [];
    var kriptoFiyat = [];
    var kriptoVolume = [];
    var kriptoCirculating = [];
    var kriptoChange = [];
    $('tbody tr td').each(function (i, elem) {
      if (
        $(this).text() !== null &&
        $(this).text() !== ' ' &&
        $(this).text() !== ''
      )
        kriptoSatir.push($(this).text());
    });
    for (var i = 0; i < kriptoSatir.length; i += 7) {
      kriptoSira.push(kriptoSatir[i]);
      kriptoName.push(kriptoSatir[i + 1]);
      kriptoMarketCap.push(kriptoSatir[i + 2]);
      kriptoFiyat.push(kriptoSatir[i + 3]);
      kriptoVolume.push(kriptoSatir[i + 4]);
      kriptoCirculating.push(kriptoSatir[i + 5]);
      kriptoChange.push(kriptoSatir[i + 6]);
    }

    var result = [];
    for (var i = 0; i < kriptoSira.length; i++) {
      kriptoObject = new Kripto(
        kriptoSira[i],
        kriptoName[i],
        kriptoMarketCap[i],
        kriptoFiyat[i],
        kriptoVolume[i],
        kriptoCirculating[i],
        kriptoChange[i]
      );
      result.push(kriptoObject);
    }
    res.json({ result });
  });
};

module.exports = { kriptoController };
