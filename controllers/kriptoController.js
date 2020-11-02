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

    for (var i = 0; i < kriptoSatir.length; i += 8) {
      var tempTD = cheerio.load(kriptoSatir[i]);
      kriptoSira.push(tempTD('p').text());

      var tempTD = cheerio.load(kriptoSatir[i + 1]);
      kriptoName.push(tempTD('a div div p').html());

      kriptoImage.push(tempTD('a div img').attr('src'));

      kriptoSembol.push(tempTD('a div div div p').text());

      var tempTD = cheerio.load(kriptoSatir[i + 2]);
      kriptoFiyat.push(tempTD('a').text());

      var tempTD = cheerio.load(kriptoSatir[i + 3]);
      kriptoDurum.push(tempTD('div div p').attr('color'));
      if (tempTD('div div p').attr('color') == 'green') {
        kriptoChange.push('+' + tempTD('div div p').text());
      } else {
        kriptoChange.push('-' + tempTD('div div p').text());
      }

      var tempTD = cheerio.load(kriptoSatir[i + 4]);
      kriptoDurum7d.push(tempTD('div div p').attr('color'));
      if (tempTD('div div p').attr('color') == 'green') {
        kriptoChange7d.push('+' + tempTD('div div p').text());
      } else {
        kriptoChange7d.push('-' + tempTD('div div p').text());
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
    res.json({ result });
  });
};

module.exports = { kriptoController };
