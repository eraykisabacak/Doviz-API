class Index {
    constructor(
        name,
        last,
        yesterday,
        percent,
        high,
        low,
        volume,
        volumePrice
    ) {
        this.name = name;
        this.last = last;
        this.yesterday = yesterday;
        this.percent = percent;
        this.high = high;
        this.low = low;
        this.volume = volume;
        this.volumePrice = volumePrice;
    }}
module.exports = Index;
