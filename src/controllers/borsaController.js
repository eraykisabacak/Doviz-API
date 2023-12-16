const cheerio = require('cheerio');
const request = require('request');

const BorsaFiyatlari = require('../models/BorsaFiyatlari');
const {errorResponse, successResponse} = require("../utils/ResponseHandler");

// https://uzmanpara.milliyet.com.tr/

const borsaController = function (req, res, next) {
  var borsalar = [];
  request(
    'https://uzmanpara.milliyet.com.tr/canli-borsa/',
    (error, response, body) => {
        if (error || res.statusCode !== 200) return errorResponse(res, 'Server Error', 500);

        try {
            let $ = cheerio.load(body);

            $('#acik_koyu_yeri tbody tr').each(function (i, elem) {
                if ($(this).text() !== null && $(this).text() !== '')
                    borsalar[i] = $(this).text();
            });

            //////
            $('#acik_koyu_yeri2 tbody tr').each(function (i, elem) {
                if ($(this).text() !== null && $(this).text() !== '')
                    borsalar.push($(this).text());
            });

            $('#acik_koyu_yeri3 tbody tr').each(function (i, elem) {
                if (
                    $(this).text() !== null &&
                    $(this).text() !== '' &&
                    $(this).text() !== ' '
                )
                    borsalar.push($(this).text());
            });

            var borsaName = [];
            var borsaZaman = [];
            var borsa = [];

            for (var i = 0; i < borsalar.length; i++) {
                borsaName.push(borsalar[i].match(/([a-zA-Z])\w+/g));
                borsa.push(borsalar[i].match(/[-]?([0-9]+,)\w+/g));
                borsaZaman.push(borsalar[i].match(/(\d{2}):(\d{2}):(\d{2})/g));
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
                    borsaName[i],
                    borsaFiyat[i],
                    borsaDegisim[i],
                    borsaZaman[i]
                );
                result.push(borsaObject);
            }
            successResponse(res, result);
        }catch (error){
            return errorResponse(res, 'Parse Error', 500);
        }
    }
  );
};

module.exports = {
  borsaController,
};
