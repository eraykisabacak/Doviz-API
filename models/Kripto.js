class Kripto {
  constructor(
    Rank,
    Name,
    Image,
    Sembol,
    MarketCap,
    Price,
    Durum,
    Volume24h,
    CirculatingSupply,
    Change24h
  ) {
    this.Rank = Rank;
    this.Name = Name;
    this.Image = Image;
    this.Sembol = Sembol;
    this.MarketCap = MarketCap;
    this.Price = Price;
    this.Durum = Durum;
    this.Volume24h = Volume24h;
    this.CirculatingSupply = CirculatingSupply;
    this.Change24h = Change24h;
  }
}

module.exports = Kripto;
