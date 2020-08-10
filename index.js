const cheerio = require('cheerio');
const request = require('request');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port = 3000;

class Doviz {
  constructor(
    bist100,
    bist100Son,
    dolar,
    dolarSon,
    euro,
    euroSon,
    altın,
    altınSon,
    petrol,
    petrolSon,
    bono,
    bonoSon
  ) {
    this.Bist100 = bist100;
    this.Bist100Degisim = bist100Son;
    this.Dolar = dolar;
    this.DolarDegisim = dolarSon;
    this.Euro = euro;
    this.EuroDegisim = euroSon;
    this.Altın = altın;
    this.AltınDegisim = altınSon;
    this.Petrol = petrol;
    this.PetrolDegisim = petrolSon;
    this.Bono = bono;
    this.BonoDegisim = bonoSon;
  }
}

class AltinFiyatlari {
  constructor(Alis, Satis, Degisim, Saat) {
    this.Alis = Alis;
    this.Satis = Satis;
    this.Degisim = Degisim;
    this.Saat = Saat;
  }
}

class BorsaFiyatlari {
  constructor(Name, Fiyat, Degisim, Saat) {
    this.Name = Name;
    this.Fiyat = Fiyat;
    this.Degisim = Degisim;
    this.Saat = Saat;
  }
}

// https://uzmanpara.milliyet.com.tr/

app.get('/', function (req, res) {
  var dovizler = [];
  request('https://uzmanpara.milliyet.com.tr', (error, response, body) => {
    if (error && res.statusCode == 200) return console.error(error);

    let $ = cheerio.load(body);

    let bist100 = $('#imkb_header_son_data').text();
    let bist100Son = $('#imkb_header_son').text();

    let dolar = $('#usd_header_son_data').text();
    let dolarSon = $('#usd_header_son').text();

    let euro = $('#eur_header_son_data').text();
    let euroSon = $('#eur_header_son').text();

    let altın = $('#gld_header_son_data').text();
    let altınSon = $('#gld_header_son').text();

    let petrol = $('#petrol_header_son_data').text();
    let petrolSon = $('#petrol_header_son').text();

    let bono = $('#bono_header_son_data').text();
    let bonoSon = $('#bono_header_son').text();

    console.log(dovizler);
    var durum = new Doviz(
      bist100,
      bist100Son,
      dolar,
      dolarSon,
      euro,
      euroSon,
      altın,
      altınSon,
      petrol,
      petrolSon,
      bono,
      bonoSon
    );
    dovizler.push(durum);

    /*
    console.log(durum);
    console.log('Bist100 : ' + bist100 + ' Son : ' + bist100Son);
    console.log('Dolar Fiyat : ' + dolar + ' Son : ' + dolarSon);
    console.log('Euro Fiyat : ' + euro + ' Son : ' + euroSon);
    console.log('Altın Fiyat : ' + altın + ' Son : ' + altınSon);
    console.log('Petrol Fiyat : ' + petrol + ' Son : ' + petrolSon);
    console.log('Bono Fiyat : ' + bono + ' Son : ' + bonoSon);
	*/

    res.json(dovizler);
  });
});

app.get('/altin', function (req, res) {
  var altinDovizler = [];
  request(
    'https://uzmanpara.milliyet.com.tr/altin-fiyatlari/',
    (error, response, body) => {
      if (error && res.statusCode == 200) return console.error(error);

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

      res.json({
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
      //res.send(altinDovizler);
    }
  );
});

app.get('/gumus', function (req, res) {
  var gumusDovizler = [];
  request(
    'https://uzmanpara.milliyet.com.tr/altin-fiyatlari/',
    (error, response, body) => {
      if (error && res.statusCode == 200) return console.error(error);

      let $ = cheerio.load(body);

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

      res.json({
        GumusGramSpot,
        Gumus,
        GumusEuro,
        GumusGramDolar,
        GumusGramTurkLirasi,
      });
      //res.send(gumusDovizler);
    }
  );
});

app.get('/borsa', function (req, res) {
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
      console.log(borsaName);
      console.log(borsaFiyat);
      console.log(borsaDegisim);
      console.log(borsaZaman);
    }
  );
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, function () {
  console.log('The app is running...');
});
