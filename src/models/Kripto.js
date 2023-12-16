class Kripto {
  constructor(
    Rank,
    Name,
    Image,
    Sembol,
    MarketCap,
    Price,
    Durum,
    Durum7d,
    Volume24h,
    CirculatingSupply,
    Change24h,
    Change7d
  ) {
    this.Rank = Rank;
    this.Name = Name;
    this.Image = Image;
    this.Sembol = Sembol;
    this.MarketCap = MarketCap;
    this.Price = Price;
    this.Durum = Durum;
    this.Durum7d = Durum7d;
    this.Volume24h = Volume24h;
    this.CirculatingSupply = CirculatingSupply;
    this.Change24h = Change24h;
    this.Change7d = Change7d;
  }
}

module.exports = Kripto;
