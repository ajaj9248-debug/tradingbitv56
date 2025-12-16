print("=== XAUUSD SIGNAL TEST ===")

price = float(input("Enter current XAUUSD price: "))

ema50 = float(input("Enter EMA 50 value: "))
ema200 = float(input("Enter EMA 200 value: "))

atr = float(input("Enter ATR value: "))

sl_multiplier = 2.0
tp_multiplier = 2.5

if price > ema50 and ema50 > ema200:
    signal = "BUY"
    sl = price - (atr * sl_multiplier)
    tp = price + (atr * tp_multiplier)
elif price < ema50 and ema50 < ema200:
    signal = "SELL"
    sl = price + (atr * sl_multiplier)
    tp = price - (atr * tp_multiplier)
else:
    signal = "WAIT"
    sl = "-"
    tp = "-"

print("\nSignal:", signal)
print("Entry:", price)
print("SL:", sl)
print("TP:", tp)
