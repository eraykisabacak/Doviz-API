const cheerio = require('cheerio');
const request = require('request');

const BorsaFiyatlari = require('../models/BorsaFiyatlari');

// https://uzmanpara.milliyet.com.tr/

const borsaController = function (req, res, next) {
  var borsalar = [];
  request(
    'https://uzmanpara.milliyet.com.tr/canli-borsa/',
    (error, response, body) => {
      if (error && res.statusCode == 200) return console.error(error);

      let $ = cheerio.load(body);

      $('#acik_koyu_yeri tbody tr').each(function (i, elem) {
        if ($(this).text() !== null && $(this).text() !== '')
          borsalar[i] = $(this).text();
      });
      var borsa = [];
      for (var i = 0; i < borsalar.length; i++) {
        borsa.push(borsalar[i].split('\t\t\t\t\t\t\t\t\t\t\t\t'));
      }
      //////
      $('#acik_koyu_yeri2 tbody tr').each(function (i, elem) {
        if ($(this).text() !== null && $(this).text() !== '')
          borsalar.push($(this).text());
      });
      var borsa = [];
      for (var i = 0; i < borsalar.length; i++) {
        borsa.push(borsalar[i].split('\t\t\t\t\t\t\t\t\t\t\t'));
        console.log(borsalar[i]);
      }
      //////
      $('#acik_koyu_yeri3 tbody tr').each(function (i, elem) {
        if ($(this).text() !== null && $(this).text() !== '')
          borsalar.push($(this).text());
      });

      var borsa = [];
      for (var i = 0; i < borsalar.length; i++) {
        borsa.push(borsalar[i].split('\t\t\t\t\t\t\t\t\t\t\t'));
      }

      var borsaName = [];
      var borsaFiyat = [];
      var borsaDegisim = [];
      var borsaZaman = [];
      for (var i = 0; i < borsa.length; i++) {
        borsaName.push(borsa[i][1]);
        borsaFiyat.push(borsa[i][3]);
        borsaDegisim.push(borsa[i][4]);
        borsaZaman.push(borsa[i][5]);
      }

      var result = [];
      for (var i = 1; i < borsaName.length; i++) {
        borsaObject = new BorsaFiyatlari(
          borsaName[i],
          borsaFiyat[i],
          borsaDegisim[i],
          borsaZaman[i]
        );
        result.push(borsaObject);
      }
      res.json({ result });
      //res.json({ borsalar });
      //console.log(borsalar);
      //console.log(borsaName);
      //console.log(borsaFiyat);
      //console.log(borsaDegisim);
      //console.log(borsaZaman);
    }
  );
};

module.exports = {
  borsaController,
};
