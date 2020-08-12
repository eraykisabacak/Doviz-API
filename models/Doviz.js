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

module.exports = Doviz;
