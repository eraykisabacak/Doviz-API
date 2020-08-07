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

const PORT = process.env.PORT || 3000;

http.listen(PORT, function () {
  console.log('The app is running...');
});
