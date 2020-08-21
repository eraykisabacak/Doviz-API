class Kripto {
  constructor(
    Rank,
    Name,
    MarketCap,
    Price,
    Volume24h,
    CirculatingSupply,
    Change24h
  ) {
    this.Rank = Rank;
    this.Name = Name;
    this.MarketCap = MarketCap;
    this.Price = Price;
    this.Volume24h = Volume24h;
    this.CirculatingSupply = CirculatingSupply;
    this.Change24h = Change24h;
  }
}

module.exports = Kripto;
