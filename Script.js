// ================= CHART SETUP =================
const chart = LightweightCharts.createChart(document.getElementById("chart"), {
  width: window.innerWidth - 20,
  height: 500,
  layout: {
    background: { color: "#ffffff" },
    textColor: "#000000",
  },
  grid: {
    vertLines: { color: "#eeeeee" },
    horzLines: { color: "#eeeeee" },
  },
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
  },
});

const candleSeries = chart.addCandlestickSeries();
const ema50Series = chart.addLineSeries({ color: "orange", lineWidth: 2 });
const ema200Series = chart.addLineSeries({ color: "blue", lineWidth: 2 });

// ================= DEMO CANDLE DATA =================
// (Later you can replace this with real API data)
const candles = [
  { time: "2024-01-01", open: 2000, high: 2025, low: 1990, close: 2015 },
  { time: "2024-01-02", open: 2015, high: 2030, low: 2010, close: 2022 },
  { time: "2024-01-03", open: 2022, high: 2040, low: 2018, close: 2035 },
  { time: "2024-01-04", open: 2035, high: 2055, low: 2030, close: 2048 },
  { time: "2024-01-05", open: 2048, high: 2070, low: 2040, close: 2060 },
];

candleSeries.setData(candles);

// ================= EMA FUNCTION =================
function calculateEMA(data, period) {
  const k = 2 / (period + 1);
  let ema = data[0].close;
  let result = [{ time: data[0].time, value: ema }];

  for (let i = 1; i < data.length; i++) {
    ema = data[i].close * k + ema * (1 - k);
    result.push({ time: data[i].time, value: ema });
  }
  return result;
}

// ================= EMA CALC =================
const ema50 = calculateEMA(candles, 50);
const ema200 = calculateEMA(candles, 200);

ema50Series.setData(ema50);
ema200Series.setData(ema200);

// ================= BUY / SELL SIGNAL =================
const lastCandle = candles[candles.length - 1];
const lastEma50 = ema50[ema50.length - 1].value;
const lastEma200 = ema200[ema200.length - 1].value;

let signal = "WAIT";

if (lastCandle.close > lastEma50 && lastEma50 > lastEma200) {
  signal = "BUY";
}

if (lastCandle.close < lastEma50 && lastEma50 < lastEma200) {
  signal = "SELL";
}

chart.addPriceLine({
  price: lastCandle.close,
  color: signal === "BUY" ? "green" : signal === "SELL" ? "red" : "gray",
  lineWidth: 2,
  title: signal,
});
