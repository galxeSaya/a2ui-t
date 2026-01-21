export type TVBar = {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export function generateSampleTvData(count = 100): TVBar[] {
  const out: TVBar[] = []
  const now = Date.now()
  let price = 120
  for (let i = count - 1; i >= 0; i -= 1) {
    const t = now - i * 24 * 60 * 60 * 1000
    const drift = (Math.sin(i / 8) + Math.cos(i / 5)) * 1.2
    const change = (Math.random() - 0.5) * 2 + drift
    const o = price
    price = Math.max(20, price + change)
    const c = price
    const h = Math.max(o, c) + Math.random() * 2
    const l = Math.min(o, c) - Math.random() * 2
    const v = 1000 + Math.random() * 2000
    out.push({ time: t, open: o, high: h, low: l, close: c, volume: v })
  }
  return out
}

export const bars = [
  {
      "time": 1732698000000,
      "open": 47.24,
      "high": 47.62,
      "low": 45.42,
      "close": 45.88,
      "volume": 4680403,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1732870800000,
      "open": 45.85,
      "high": 46.57,
      "low": 45.1501,
      "close": 46.43,
      "volume": 1785249,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733130000000,
      "open": 46.62,
      "high": 46.7846,
      "low": 45.04,
      "close": 45.7,
      "volume": 3745697,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733216400000,
      "open": 46.65,
      "high": 46.75,
      "low": 45.5101,
      "close": 45.9,
      "volume": 2559447,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733302800000,
      "open": 45.775,
      "high": 46.62,
      "low": 45.6,
      "close": 45.87,
      "volume": 3365596,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733389200000,
      "open": 45.85,
      "high": 46.19,
      "low": 45.05,
      "close": 46.17,
      "volume": 2235609,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733475600000,
      "open": 44.7,
      "high": 44.755,
      "low": 41.58,
      "close": 42.49,
      "volume": 9526611,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733734800000,
      "open": 44.11,
      "high": 44.735,
      "low": 41.87,
      "close": 41.99,
      "volume": 6192261,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733821200000,
      "open": 41.91,
      "high": 42.045,
      "low": 40.685,
      "close": 41.09,
      "volume": 5115234,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733907600000,
      "open": 39.75,
      "high": 40.3,
      "low": 39.16,
      "close": 39.54,
      "volume": 6509499,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1733994000000,
      "open": 39.4,
      "high": 39.89,
      "low": 39.045,
      "close": 39.62,
      "volume": 3985123,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1734080400000,
      "open": 39,
      "high": 39.5,
      "low": 38.51,
      "close": 39.12,
      "volume": 3602623,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1734339600000,
      "open": 38.86,
      "high": 39.19,
      "low": 38.26,
      "close": 38.46,
      "volume": 3518297,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1734426000000,
      "open": 38,
      "high": 38.87,
      "low": 37.53,
      "close": 38.44,
      "volume": 4423210,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1734512400000,
      "open": 38.46,
      "high": 39.31,
      "low": 36.92,
      "close": 37.31,
      "volume": 4525418,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1734598800000,
      "open": 37.75,
      "high": 38.15,
      "low": 36.52,
      "close": 36.62,
      "volume": 4074482,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1734685200000,
      "open": 36.4,
      "high": 38.3,
      "low": 36.28,
      "close": 37.84,
      "volume": 8586918,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1734944400000,
      "open": 37.84,
      "high": 38.75,
      "low": 37.59,
      "close": 38.58,
      "volume": 2852149,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1735030800000,
      "open": 39,
      "high": 39.21,
      "low": 38.2301,
      "close": 38.61,
      "volume": 1056624,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1735203600000,
      "open": 38.54,
      "high": 38.58,
      "low": 38.07,
      "close": 38.35,
      "volume": 1904236,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1735290000000,
      "open": 37.97,
      "high": 38.13,
      "low": 37.38,
      "close": 37.68,
      "volume": 1924377,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1735549200000,
      "open": 37.25,
      "high": 37.73,
      "low": 36.65,
      "close": 37.15,
      "volume": 2570536,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1735635600000,
      "open": 37.24,
      "high": 38.18,
      "low": 37.24,
      "close": 37.78,
      "volume": 2458888,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1735808400000,
      "open": 38.165,
      "high": 39.04,
      "low": 37.9,
      "close": 37.99,
      "volume": 2703886,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1735894800000,
      "open": 37.95,
      "high": 37.95,
      "low": 35.3752,
      "close": 35.71,
      "volume": 7491799,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1736154000000,
      "open": 36,
      "high": 37.075,
      "low": 35.92,
      "close": 36.49,
      "volume": 5983917,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1736240400000,
      "open": 36.89,
      "high": 37.3,
      "low": 35.755,
      "close": 36.24,
      "volume": 3381466,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1736326800000,
      "open": 35.78,
      "high": 36.03,
      "low": 34.75,
      "close": 36,
      "volume": 3775303,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1736499600000,
      "open": 36.25,
      "high": 36.56,
      "low": 35.54,
      "close": 35.91,
      "volume": 2943696,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1736758800000,
      "open": 35.58,
      "high": 36.52,
      "low": 35.4,
      "close": 36.47,
      "volume": 4230003,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1736845200000,
      "open": 36.6,
      "high": 36.91,
      "low": 35.85,
      "close": 36.88,
      "volume": 3351238,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1736931600000,
      "open": 37.85,
      "high": 38.3,
      "low": 37.1,
      "close": 38.19,
      "volume": 5156312,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1737018000000,
      "open": 38.44,
      "high": 39.2,
      "low": 38.3,
      "close": 38.91,
      "volume": 4884266,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1737104400000,
      "open": 39.24,
      "high": 39.87,
      "low": 38.94,
      "close": 39.53,
      "volume": 4477360,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1737450000000,
      "open": 39.99,
      "high": 40.62,
      "low": 38.5656,
      "close": 38.61,
      "volume": 5448901,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1737536400000,
      "open": 39.61,
      "high": 39.85,
      "low": 38.68,
      "close": 38.78,
      "volume": 9452189,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1737622800000,
      "open": 37.6,
      "high": 37.99,
      "low": 36.1,
      "close": 37.35,
      "volume": 11784535,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1737709200000,
      "open": 37.85,
      "high": 37.85,
      "low": 36.7,
      "close": 37.43,
      "volume": 4983825,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1737968400000,
      "open": 36.27,
      "high": 36.6,
      "low": 34.91,
      "close": 34.97,
      "volume": 8969913,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738054800000,
      "open": 35.18,
      "high": 35.42,
      "low": 34.0362,
      "close": 34.15,
      "volume": 5684196,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738141200000,
      "open": 34.32,
      "high": 35.26,
      "low": 34.32,
      "close": 35.13,
      "volume": 5534714,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738227600000,
      "open": 35.53,
      "high": 35.815,
      "low": 34.95,
      "close": 35.53,
      "volume": 4001162,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738314000000,
      "open": 35.5,
      "high": 36.24,
      "low": 35.16,
      "close": 35.32,
      "volume": 5315132,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738573200000,
      "open": 34.18,
      "high": 35.235,
      "low": 33.42,
      "close": 34.11,
      "volume": 5864709,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738659600000,
      "open": 34.5,
      "high": 36.43,
      "low": 34.33,
      "close": 36.24,
      "volume": 5343341,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738746000000,
      "open": 36.11,
      "high": 36.24,
      "low": 35.48,
      "close": 36.03,
      "volume": 3221797,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738832400000,
      "open": 36.63,
      "high": 36.87,
      "low": 35.32,
      "close": 35.93,
      "volume": 3261306,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1738918800000,
      "open": 36.75,
      "high": 37.84,
      "low": 36.05,
      "close": 36.12,
      "volume": 4661820,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1739178000000,
      "open": 37.37,
      "high": 37.6,
      "low": 36.89,
      "close": 36.92,
      "volume": 5755227,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1739264400000,
      "open": 37.08,
      "high": 38.58,
      "low": 36.72,
      "close": 37.17,
      "volume": 6390471,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1739350800000,
      "open": 36.54,
      "high": 37.18,
      "low": 36.13,
      "close": 36.33,
      "volume": 3808972,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1739437200000,
      "open": 36.15,
      "high": 36.44,
      "low": 35.6,
      "close": 36.38,
      "volume": 4389723,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1739523600000,
      "open": 37.16,
      "high": 37.47,
      "low": 36.18,
      "close": 36.24,
      "volume": 3113686,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1739869200000,
      "open": 36.27,
      "high": 37.03,
      "low": 35.89,
      "close": 37.01,
      "volume": 2704391,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1739955600000,
      "open": 36.46,
      "high": 37,
      "low": 36.14,
      "close": 36.18,
      "volume": 3378726,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1740042000000,
      "open": 36.53,
      "high": 37.55,
      "low": 36.26,
      "close": 37.25,
      "volume": 5987797,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1740128400000,
      "open": 36.46,
      "high": 36.665,
      "low": 33.95,
      "close": 34.4,
      "volume": 7218204,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1740387600000,
      "open": 34.495,
      "high": 35.78,
      "low": 34.27,
      "close": 35.02,
      "volume": 5964227,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1740474000000,
      "open": 35.1,
      "high": 35.1,
      "low": 33.88,
      "close": 34.37,
      "volume": 3811392,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1740560400000,
      "open": 34.7,
      "high": 34.81,
      "low": 33.5,
      "close": 33.67,
      "volume": 4321350,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1740646800000,
      "open": 33.78,
      "high": 34.225,
      "low": 33.34,
      "close": 33.43,
      "volume": 3979252,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1740733200000,
      "open": 33,
      "high": 33.36,
      "low": 32.55,
      "close": 33.25,
      "volume": 4671800,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1740992400000,
      "open": 34.5,
      "high": 34.51,
      "low": 31.3,
      "close": 31.33,
      "volume": 4994462,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741078800000,
      "open": 31.355,
      "high": 31.86,
      "low": 30.15,
      "close": 31.15,
      "volume": 5231801,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741165200000,
      "open": 32.48,
      "high": 32.68,
      "low": 31.602,
      "close": 32.38,
      "volume": 4520540,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741251600000,
      "open": 32.4,
      "high": 33.84,
      "low": 32.28,
      "close": 32.83,
      "volume": 5857222,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741338000000,
      "open": 32.25,
      "high": 33.38,
      "low": 31.835,
      "close": 32.84,
      "volume": 4178828,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741593600000,
      "open": 32.42,
      "high": 32.57,
      "low": 30.63,
      "close": 30.98,
      "volume": 5773380,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741680000000,
      "open": 31.2,
      "high": 32.47,
      "low": 31.03,
      "close": 31.96,
      "volume": 7065485,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741766400000,
      "open": 32.4,
      "high": 33.6848,
      "low": 32.13,
      "close": 33.25,
      "volume": 4771057,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741852800000,
      "open": 33,
      "high": 34.1,
      "low": 31.96,
      "close": 32.31,
      "volume": 5503468,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1741939200000,
      "open": 33,
      "high": 33.605,
      "low": 32.59,
      "close": 33.53,
      "volume": 3837315,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1742198400000,
      "open": 33.68,
      "high": 35.12,
      "low": 33.675,
      "close": 34.79,
      "volume": 5839340,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1742284800000,
      "open": 34.59,
      "high": 34.66,
      "low": 32.99,
      "close": 33.97,
      "volume": 5358568,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1742371200000,
      "open": 34.44,
      "high": 35.77,
      "low": 34.15,
      "close": 35.31,
      "volume": 4510664,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1742457600000,
      "open": 34.57,
      "high": 35.47,
      "low": 34.37,
      "close": 34.84,
      "volume": 3102810,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1742544000000,
      "open": 33.93,
      "high": 34.0796,
      "low": 33.45,
      "close": 33.95,
      "volume": 4720614,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1742803200000,
      "open": 34.455,
      "high": 34.63,
      "low": 33.31,
      "close": 33.47,
      "volume": 4809045,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1742889600000,
      "open": 33.68,
      "high": 34.525,
      "low": 33.61,
      "close": 33.71,
      "volume": 3650854,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1742976000000,
      "open": 34.09,
      "high": 34.45,
      "low": 33.06,
      "close": 33.34,
      "volume": 3354333,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1743062400000,
      "open": 32.33,
      "high": 32.85,
      "low": 31.8,
      "close": 31.98,
      "volume": 6066832,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1743148800000,
      "open": 32.05,
      "high": 32.18,
      "low": 30.51,
      "close": 30.66,
      "volume": 6446552,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1743408000000,
      "open": 29.74,
      "high": 30.625,
      "low": 28.8,
      "close": 30.5,
      "volume": 4982209,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1743494400000,
      "open": 30.3,
      "high": 30.54,
      "low": 29.4,
      "close": 30.14,
      "volume": 4272462,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1743580800000,
      "open": 29.58,
      "high": 31.09,
      "low": 29.45,
      "close": 30.84,
      "volume": 6289774,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1743667200000,
      "open": 28.85,
      "high": 28.99,
      "low": 27.125,
      "close": 27.33,
      "volume": 9025452,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1743753600000,
      "open": 26.28,
      "high": 26.54,
      "low": 23.62,
      "close": 24.81,
      "volume": 13147207,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744012800000,
      "open": 23.92,
      "high": 26.26,
      "low": 23.021,
      "close": 24.59,
      "volume": 7461959,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744099200000,
      "open": 25.22,
      "high": 25.88,
      "low": 22.1,
      "close": 22.57,
      "volume": 8923904,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744185600000,
      "open": 22.13,
      "high": 26.67,
      "low": 21.53,
      "close": 25.86,
      "volume": 13028208,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744272000000,
      "open": 24.56,
      "high": 24.71,
      "low": 22.475,
      "close": 23.75,
      "volume": 11076580,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744358400000,
      "open": 24.22,
      "high": 25.01,
      "low": 23.8602,
      "close": 24.75,
      "volume": 7485991,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744617600000,
      "open": 25.52,
      "high": 25.91,
      "low": 24.62,
      "close": 25.01,
      "volume": 5833825,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744704000000,
      "open": 24.51,
      "high": 25.37,
      "low": 24.44,
      "close": 24.68,
      "volume": 4226924,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744790400000,
      "open": 24.17,
      "high": 25.26,
      "low": 24.16,
      "close": 25.07,
      "volume": 9150615,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1744876800000,
      "open": 23.8,
      "high": 24.65,
      "low": 23.061,
      "close": 23.32,
      "volume": 13620418,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1745222400000,
      "open": 23.1,
      "high": 23.55,
      "low": 22.68,
      "close": 23.3,
      "volume": 7072920,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1745308800000,
      "open": 23.62,
      "high": 24.94,
      "low": 23.57,
      "close": 24.32,
      "volume": 8992926,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1745395200000,
      "open": 25.23,
      "high": 26.19,
      "low": 24.81,
      "close": 25.05,
      "volume": 8478266,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1745481600000,
      "open": 25.25,
      "high": 26.615,
      "low": 25.25,
      "close": 26.44,
      "volume": 6323175,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1745568000000,
      "open": 25.73,
      "high": 26.0681,
      "low": 25.36,
      "close": 25.71,
      "volume": 5296229,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1745827200000,
      "open": 25.45,
      "high": 26.0408,
      "low": 25.19,
      "close": 25.56,
      "volume": 7350738,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1745913600000,
      "open": 25.25,
      "high": 25.541391,
      "low": 24.95,
      "close": 25.19,
      "volume": 5833569,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1746000000000,
      "open": 24,
      "high": 24.6,
      "low": 23.6,
      "close": 24.53,
      "volume": 5394688,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1746086400000,
      "open": 24.85,
      "high": 24.94,
      "low": 24.395,
      "close": 24.54,
      "volume": 5126365,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1746172800000,
      "open": 25.11,
      "high": 25.88,
      "low": 24.74,
      "close": 25.53,
      "volume": 5393994,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1746432000000,
      "open": 25.32,
      "high": 25.4499,
      "low": 24.93,
      "close": 25.07,
      "volume": 4453796,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1746518400000,
      "open": 24.8,
      "high": 25.17,
      "low": 24.68,
      "close": 24.85,
      "volume": 5594220,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1746604800000,
      "open": 24.75,
      "high": 24.91,
      "low": 24.15,
      "close": 24.4,
      "volume": 5297146,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1746691200000,
      "open": 24.66,
      "high": 26,
      "low": 24.4,
      "close": 25.72,
      "volume": 9761233,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1746777600000,
      "open": 25.9,
      "high": 26.3,
      "low": 25.78,
      "close": 25.92,
      "volume": 6144915,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747036800000,
      "open": 27.5,
      "high": 28.51,
      "low": 27.5,
      "close": 28.12,
      "volume": 11556284,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747123200000,
      "open": 28.2,
      "high": 28.8,
      "low": 28.2,
      "close": 28.65,
      "volume": 6836555,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747209600000,
      "open": 28.78,
      "high": 29.86,
      "low": 28.75,
      "close": 29.61,
      "volume": 9355087,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747296000000,
      "open": 28.05,
      "high": 28.95,
      "low": 27.98,
      "close": 28.67,
      "volume": 7055042,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747382400000,
      "open": 28.29,
      "high": 29.67,
      "low": 28.29,
      "close": 29.4,
      "volume": 8807675,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747641600000,
      "open": 28.63,
      "high": 29.73,
      "low": 28.63,
      "close": 29.41,
      "volume": 6323928,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747728000000,
      "open": 29.25,
      "high": 29.45,
      "low": 28.48,
      "close": 28.79,
      "volume": 4362798,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747814400000,
      "open": 28.48,
      "high": 29.42,
      "low": 28.24,
      "close": 28.27,
      "volume": 6272441,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747900800000,
      "open": 28.06,
      "high": 28.355,
      "low": 27.53,
      "close": 27.98,
      "volume": 4815238,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1747987200000,
      "open": 27.33,
      "high": 28.81,
      "low": 27.26,
      "close": 28.07,
      "volume": 5297560,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1748332800000,
      "open": 28.25,
      "high": 28.5,
      "low": 28,
      "close": 28.25,
      "volume": 4742273,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1748419200000,
      "open": 28.26,
      "high": 28.28,
      "low": 27.607956,
      "close": 27.88,
      "volume": 4859013,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1748505600000,
      "open": 28.43,
      "high": 28.43,
      "low": 27.415,
      "close": 27.63,
      "volume": 3182058,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1748592000000,
      "open": 27.31,
      "high": 27.547,
      "low": 26.54,
      "close": 26.77,
      "volume": 5724425,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1748851200000,
      "open": 26.15,
      "high": 26.97,
      "low": 25.83,
      "close": 26.6,
      "volume": 11089117,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1748937600000,
      "open": 26.64,
      "high": 27.885,
      "low": 25.94,
      "close": 27.66,
      "volume": 9010205,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1749024000000,
      "open": 27.91,
      "high": 27.92,
      "low": 27.31,
      "close": 27.37,
      "volume": 4693666,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1749110400000,
      "open": 27.8,
      "high": 28.4099,
      "low": 27.66,
      "close": 27.87,
      "volume": 5947026,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1749196800000,
      "open": 28.2,
      "high": 28.47,
      "low": 27.78,
      "close": 28.01,
      "volume": 3699705,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1749456000000,
      "open": 28.44,
      "high": 29.02,
      "low": 28.22,
      "close": 28.56,
      "volume": 6632812,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1749542400000,
      "open": 28.69,
      "high": 29.42,
      "low": 28.475,
      "close": 28.76,
      "volume": 5709530,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1749628800000,
      "open": 29.3,
      "high": 30.02,
      "low": 28.5882,
      "close": 28.74,
      "volume": 8174569,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1749715200000,
      "open": 28.02,
      "high": 28.8925,
      "low": 27.98,
      "close": 28.86,
      "volume": 4319652,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1749801600000,
      "open": 28.07,
      "high": 28.64,
      "low": 28,
      "close": 28.35,
      "volume": 3202493,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1750060800000,
      "open": 28.73,
      "high": 29.15,
      "low": 28.53,
      "close": 29.01,
      "volume": 5197489,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1750147200000,
      "open": 29.045,
      "high": 29.49,
      "low": 28.61,
      "close": 28.72,
      "volume": 5188049,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1750233600000,
      "open": 28.63,
      "high": 28.85,
      "low": 28.13,
      "close": 28.35,
      "volume": 5634805,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1750406400000,
      "open": 28.53,
      "high": 28.61,
      "low": 27.83,
      "close": 27.86,
      "volume": 7894057,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1750665600000,
      "open": 28.05,
      "high": 28.75,
      "low": 27.888,
      "close": 28.71,
      "volume": 5277849,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1750752000000,
      "open": 28.85,
      "high": 29.18,
      "low": 28.22,
      "close": 28.8,
      "volume": 5249050,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1750838400000,
      "open": 28.95,
      "high": 28.97,
      "low": 28.13,
      "close": 28.17,
      "volume": 3769322,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1750924800000,
      "open": 28.58,
      "high": 30.3,
      "low": 28.54,
      "close": 29.93,
      "volume": 6456185,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1751011200000,
      "open": 29.88,
      "high": 29.9991,
      "low": 27.72,
      "close": 28.47,
      "volume": 9417453,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1751270400000,
      "open": 29.15,
      "high": 29.6,
      "low": 29.03,
      "close": 29.51,
      "volume": 7087678,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1751356800000,
      "open": 29.71,
      "high": 30.715,
      "low": 29.59,
      "close": 30.2,
      "volume": 7335262,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1751443200000,
      "open": 30.79,
      "high": 31.63,
      "low": 30.71,
      "close": 31.52,
      "volume": 8882262,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1751529600000,
      "open": 31.3,
      "high": 31.68,
      "low": 31.13,
      "close": 31.15,
      "volume": 3040872,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1751875200000,
      "open": 30.54,
      "high": 30.695,
      "low": 29.625,
      "close": 29.81,
      "volume": 5086676,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1751961600000,
      "open": 30.37,
      "high": 31.44,
      "low": 30.18,
      "close": 30.51,
      "volume": 5703502,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1752048000000,
      "open": 30.61,
      "high": 30.96,
      "low": 30.23,
      "close": 30.58,
      "volume": 4616359,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1752134400000,
      "open": 31.32,
      "high": 31.965,
      "low": 30.95,
      "close": 31.57,
      "volume": 4958134,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1752220800000,
      "open": 31.27,
      "high": 31.3645,
      "low": 30.62,
      "close": 31.09,
      "volume": 4425084,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1752480000000,
      "open": 30.5,
      "high": 30.74,
      "low": 29.22,
      "close": 29.79,
      "volume": 7747236,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1752566400000,
      "open": 30,
      "high": 30.13,
      "low": 28.44,
      "close": 28.49,
      "volume": 7001677,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1752652800000,
      "open": 28.63,
      "high": 28.91,
      "low": 28.12,
      "close": 28.56,
      "volume": 9338437,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1752739200000,
      "open": 29.12,
      "high": 30.39,
      "low": 28.94,
      "close": 29.39,
      "volume": 11921186,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1752825600000,
      "open": 29.78,
      "high": 30.6799,
      "low": 29.29,
      "close": 30.33,
      "volume": 7421074,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753084800000,
      "open": 31.51,
      "high": 31.82,
      "low": 30.92,
      "close": 30.98,
      "volume": 7500591,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753171200000,
      "open": 31.29,
      "high": 31.975,
      "low": 31.145,
      "close": 31.93,
      "volume": 5801355,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753257600000,
      "open": 32.25,
      "high": 32.329,
      "low": 31.63,
      "close": 32.1,
      "volume": 4947711,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753344000000,
      "open": 31.66,
      "high": 32.24,
      "low": 31.2301,
      "close": 31.86,
      "volume": 6445138,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753430400000,
      "open": 31.5,
      "high": 31.7,
      "low": 30.38,
      "close": 30.84,
      "volume": 6912217,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753689600000,
      "open": 30.8,
      "high": 31.32,
      "low": 30.17,
      "close": 30.68,
      "volume": 5907354,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753776000000,
      "open": 30.5,
      "high": 30.83,
      "low": 30.09,
      "close": 30.44,
      "volume": 4733970,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753862400000,
      "open": 30.36,
      "high": 30.48,
      "low": 29.72,
      "close": 30.12,
      "volume": 6061335,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1753948800000,
      "open": 29.87,
      "high": 30.685,
      "low": 29.66,
      "close": 29.97,
      "volume": 5337665,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1754035200000,
      "open": 29.2,
      "high": 29.29,
      "low": 28.11,
      "close": 28.4,
      "volume": 6930401,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1754294400000,
      "open": 28.83,
      "high": 29.29,
      "low": 28.5,
      "close": 29.12,
      "volume": 5493478,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1754380800000,
      "open": 29.5,
      "high": 29.73,
      "low": 28.8347,
      "close": 29.62,
      "volume": 3578773,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1754467200000,
      "open": 30.44,
      "high": 30.618,
      "low": 29.48,
      "close": 29.55,
      "volume": 4902985,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1754553600000,
      "open": 30.07,
      "high": 30.18,
      "low": 29.02,
      "close": 30.1,
      "volume": 4252949,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1754640000000,
      "open": 30.2,
      "high": 30.87,
      "low": 29.92,
      "close": 30.17,
      "volume": 4868090,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1754899200000,
      "open": 30.25,
      "high": 30.515,
      "low": 29.24,
      "close": 29.33,
      "volume": 8075708,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1754985600000,
      "open": 29.73,
      "high": 31.5,
      "low": 29.61,
      "close": 31.38,
      "volume": 7923769,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1755072000000,
      "open": 31.65,
      "high": 31.7536,
      "low": 31.23,
      "close": 31.73,
      "volume": 4157022,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1755158400000,
      "open": 31.08,
      "high": 31.44,
      "low": 30.53,
      "close": 31.33,
      "volume": 4725672,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1755244800000,
      "open": 31.39,
      "high": 31.54,
      "low": 30.96,
      "close": 31.27,
      "volume": 5523026,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1755504000000,
      "open": 30.77,
      "high": 30.945,
      "low": 29.39,
      "close": 29.63,
      "volume": 7364613,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1755590400000,
      "open": 29.75,
      "high": 30.15,
      "low": 29.5762,
      "close": 29.85,
      "volume": 3961339,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1755676800000,
      "open": 29.46,
      "high": 29.7221,
      "low": 29.1407,
      "close": 29.33,
      "volume": 3463917,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1755763200000,
      "open": 29.04,
      "high": 29.61,
      "low": 28.92,
      "close": 29.51,
      "volume": 3101558,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1755849600000,
      "open": 29.57,
      "high": 32.16,
      "low": 29.49,
      "close": 31.68,
      "volume": 8535426,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1756108800000,
      "open": 31.55,
      "high": 32.09,
      "low": 31.5034,
      "close": 31.8,
      "volume": 3896710,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1756195200000,
      "open": 31.6,
      "high": 32.3788,
      "low": 31.5,
      "close": 31.95,
      "volume": 3652110,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1756281600000,
      "open": 31.43,
      "high": 31.9093,
      "low": 31.01,
      "close": 31.8,
      "volume": 3697950,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1756368000000,
      "open": 32.07,
      "high": 32.35,
      "low": 31.36,
      "close": 31.92,
      "volume": 3678622,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1756454400000,
      "open": 31.9,
      "high": 32.47,
      "low": 31.8,
      "close": 32.19,
      "volume": 4180732,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1756800000000,
      "open": 31.1,
      "high": 31.18,
      "low": 30.21,
      "close": 30.94,
      "volume": 8241243,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1756886400000,
      "open": 30.61,
      "high": 31.445,
      "low": 30.28,
      "close": 31.11,
      "volume": 6133608,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1756972800000,
      "open": 30.86,
      "high": 31.31,
      "low": 30.58,
      "close": 31.29,
      "volume": 5865503,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1757059200000,
      "open": 31.7299,
      "high": 32.07,
      "low": 30.99,
      "close": 31.83,
      "volume": 5686270,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1757318400000,
      "open": 32.01,
      "high": 32.145,
      "low": 30.835,
      "close": 32.04,
      "volume": 6671961,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1757404800000,
      "open": 32.19,
      "high": 32.91,
      "low": 31.255,
      "close": 31.27,
      "volume": 6652766,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1757491200000,
      "open": 31.3,
      "high": 32.1,
      "low": 30.76,
      "close": 30.93,
      "volume": 6482517,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1757577600000,
      "open": 31.01,
      "high": 32.355,
      "low": 30.71,
      "close": 32.29,
      "volume": 6107207,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1757664000000,
      "open": 32.37,
      "high": 33.45,
      "low": 32.37,
      "close": 33.24,
      "volume": 8313437,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1757923200000,
      "open": 33.58,
      "high": 34.15,
      "low": 33.4,
      "close": 33.6,
      "volume": 5656812,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758009600000,
      "open": 33.86,
      "high": 34.25,
      "low": 33.115,
      "close": 33.48,
      "volume": 5921608,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758096000000,
      "open": 33,
      "high": 34.14,
      "low": 32.73,
      "close": 32.86,
      "volume": 6699216,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758182400000,
      "open": 33.25,
      "high": 33.298,
      "low": 32.645,
      "close": 32.72,
      "volume": 4318792,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758268800000,
      "open": 32.77,
      "high": 32.99,
      "low": 32.28,
      "close": 32.46,
      "volume": 6383108,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758528000000,
      "open": 32,
      "high": 32.64,
      "low": 31.79,
      "close": 32.63,
      "volume": 4758298,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758614400000,
      "open": 32.67,
      "high": 32.97,
      "low": 31.03,
      "close": 31.53,
      "volume": 7983278,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758700800000,
      "open": 31.76,
      "high": 32.03,
      "low": 31.105,
      "close": 31.23,
      "volume": 7167674,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758787200000,
      "open": 31.21,
      "high": 31.845,
      "low": 30.81,
      "close": 31.45,
      "volume": 5327535,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1758873600000,
      "open": 31.55,
      "high": 32.8299,
      "low": 31.45,
      "close": 32.71,
      "volume": 6488943,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759132800000,
      "open": 33.58,
      "high": 33.92,
      "low": 32.96,
      "close": 33.85,
      "volume": 7467915,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759219200000,
      "open": 33.465,
      "high": 33.465,
      "low": 31.98,
      "close": 32.89,
      "volume": 8584168,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759305600000,
      "open": 33,
      "high": 34.33,
      "low": 32.855,
      "close": 33.85,
      "volume": 5804254,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759392000000,
      "open": 34.07,
      "high": 35.045,
      "low": 33.97,
      "close": 34.83,
      "volume": 8145898,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759478400000,
      "open": 35.14,
      "high": 35.25,
      "low": 34.35,
      "close": 34.5,
      "volume": 5786885,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759737600000,
      "open": 34.95,
      "high": 35.49,
      "low": 33.77,
      "close": 33.79,
      "volume": 5365897,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759824000000,
      "open": 34.1,
      "high": 35.865,
      "low": 34.0201,
      "close": 35.53,
      "volume": 11291420,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759910400000,
      "open": 36.48,
      "high": 37.58,
      "low": 36.39,
      "close": 37.06,
      "volume": 10564561,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1759996800000,
      "open": 38.08,
      "high": 38.09,
      "low": 36.78,
      "close": 37,
      "volume": 9032966,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1760083200000,
      "open": 37.06,
      "high": 37.35,
      "low": 35.01,
      "close": 35.02,
      "volume": 7317646,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1760342400000,
      "open": 36.41,
      "high": 36.9,
      "low": 35.61,
      "close": 36.25,
      "volume": 6299549,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1760428800000,
      "open": 35.44,
      "high": 36.415,
      "low": 35.13,
      "close": 35.75,
      "volume": 5867052,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1760515200000,
      "open": 36.3,
      "high": 36.66,
      "low": 35.615,
      "close": 36.46,
      "volume": 5311014,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1760601600000,
      "open": 36.85,
      "high": 37.9,
      "low": 36.55,
      "close": 37.13,
      "volume": 5977998,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1760688000000,
      "open": 36.58,
      "high": 36.759,
      "low": 35.64,
      "close": 35.97,
      "volume": 4397913,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1760947200000,
      "open": 36.51,
      "high": 39.28,
      "low": 36.34,
      "close": 38.96,
      "volume": 10907912,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761033600000,
      "open": 37.96,
      "high": 38,
      "low": 36.07,
      "close": 37.23,
      "volume": 8781521,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761120000000,
      "open": 37.38,
      "high": 37.53,
      "low": 35.45,
      "close": 35.65,
      "volume": 9566779,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761206400000,
      "open": 37.685,
      "high": 41.55,
      "low": 37.685,
      "close": 40.14,
      "volume": 20278197,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761292800000,
      "open": 38.48,
      "high": 39.98,
      "low": 37.78,
      "close": 39.42,
      "volume": 10623384,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761552000000,
      "open": 39.74,
      "high": 40.81,
      "low": 39.3417,
      "close": 39.9,
      "volume": 7207004,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761638400000,
      "open": 39.745,
      "high": 39.94,
      "low": 39.09,
      "close": 39.31,
      "volume": 6073428,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761724800000,
      "open": 39.95,
      "high": 40,
      "low": 38.7,
      "close": 38.91,
      "volume": 6292776,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761811200000,
      "open": 38,
      "high": 38,
      "low": 36.3,
      "close": 36.76,
      "volume": 10180221,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1761897600000,
      "open": 37.02,
      "high": 37.02,
      "low": 36.42,
      "close": 36.79,
      "volume": 4578328,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1762160400000,
      "open": 36.97,
      "high": 37.34,
      "low": 36.595,
      "close": 37.2,
      "volume": 5225603,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1762246800000,
      "open": 35.9,
      "high": 36.6727,
      "low": 35.215,
      "close": 35.26,
      "volume": 4886109,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1762333200000,
      "open": 35.5,
      "high": 36.26,
      "low": 35.26,
      "close": 35.74,
      "volume": 5215141,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1762419600000,
      "open": 36.02,
      "high": 37.5,
      "low": 35.8,
      "close": 36.7,
      "volume": 8742045,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1762506000000,
      "open": 36.06,
      "high": 37.58,
      "low": 35.54,
      "close": 37.32,
      "volume": 4693758,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1762765200000,
      "open": 38.54,
      "high": 39.17,
      "low": 38.22,
      "close": 38.79,
      "volume": 5676473,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1762851600000,
      "open": 38.79,
      "high": 38.875,
      "low": 37.355,
      "close": 37.48,
      "volume": 4301533,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1762938000000,
      "open": 38.17,
      "high": 40.38,
      "low": 38.145,
      "close": 40.03,
      "volume": 8544680,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1763024400000,
      "open": 40.18,
      "high": 40.25,
      "low": 37.69,
      "close": 38.19,
      "volume": 7396132,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1763110800000,
      "open": 36.82,
      "high": 38.145,
      "low": 36.42,
      "close": 37.59,
      "volume": 4371664,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1763370000000,
      "open": 37.02,
      "high": 37.04,
      "low": 35.36,
      "close": 35.78,
      "volume": 6772240,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1763456400000,
      "open": 35.43,
      "high": 36.87,
      "low": 35.17,
      "close": 36.55,
      "volume": 5739871,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1763542800000,
      "open": 36.52,
      "high": 37.16,
      "low": 36.23,
      "close": 36.72,
      "volume": 4079299,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1763629200000,
      "open": 37.41,
      "high": 38.28,
      "low": 35.55,
      "close": 35.83,
      "volume": 5687481,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1763715600000,
      "open": 35.51,
      "high": 36.965,
      "low": 35.12,
      "close": 36.34,
      "volume": 5183018,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1763974800000,
      "open": 37.01,
      "high": 38.835,
      "low": 36.63,
      "close": 38.72,
      "volume": 4911601,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1764061200000,
      "open": 38.87,
      "high": 39.76,
      "low": 38.49,
      "close": 39.2,
      "volume": 5009117,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1764147600000,
      "open": 39.6,
      "high": 42.16,
      "low": 39.6,
      "close": 41.57,
      "volume": 7661971,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1764320400000,
      "open": 42.17,
      "high": 42.17,
      "low": 41.48,
      "close": 41.74,
      "volume": 3768964,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1764579600000,
      "open": 41.82,
      "high": 42.73,
      "low": 41.45,
      "close": 41.65,
      "volume": 7454908,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1764666000000,
      "open": 41.65,
      "high": 42.229,
      "low": 41.3,
      "close": 41.45,
      "volume": 5932400,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1764752400000,
      "open": 42.41,
      "high": 44.96,
      "low": 42.32,
      "close": 44.1,
      "volume": 8937510,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1764838800000,
      "open": 43.95,
      "high": 44.46,
      "low": 43.52,
      "close": 44.01,
      "volume": 5540460,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1764925200000,
      "open": 44.25,
      "high": 44.8424,
      "low": 43.731,
      "close": 43.77,
      "volume": 5135350,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1765184400000,
      "open": 43.99,
      "high": 44.7,
      "low": 43.04,
      "close": 44.46,
      "volume": 7234708,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1765270800000,
      "open": 43.645,
      "high": 44.535,
      "low": 43.34,
      "close": 43.47,
      "volume": 4859844,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1765357200000,
      "open": 43.78,
      "high": 44.77,
      "low": 42.76,
      "close": 44.64,
      "volume": 8209391,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1765443600000,
      "open": 44.5,
      "high": 47.48,
      "low": 44.5,
      "close": 47.24,
      "volume": 8980457,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1765530000000,
      "open": 47.1,
      "high": 48.118,
      "low": 45.82,
      "close": 46.14,
      "volume": 7533565,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1765789200000,
      "open": 46.66,
      "high": 46.68,
      "low": 45.4,
      "close": 45.49,
      "volume": 3853831,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1765875600000,
      "open": 46,
      "high": 46.96,
      "low": 45.66,
      "close": 46.56,
      "volume": 4552993,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1765962000000,
      "open": 47.2,
      "high": 47.83,
      "low": 46.66,
      "close": 46.84,
      "volume": 4564061,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1766048400000,
      "open": 47.25,
      "high": 48.73,
      "low": 47.03,
      "close": 48.18,
      "volume": 5807956,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1766134800000,
      "open": 48.66,
      "high": 51.67,
      "low": 48.5401,
      "close": 51.25,
      "volume": 9579677,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1766394000000,
      "open": 51.99,
      "high": 53.9871,
      "low": 51.75,
      "close": 53.72,
      "volume": 8577162,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1766480400000,
      "open": 54.36,
      "high": 54.36,
      "low": 53.08,
      "close": 53.65,
      "volume": 5557757,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1766566800000,
      "open": 54,
      "high": 54.0283,
      "low": 53,
      "close": 53.63,
      "volume": 1884211,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1766739600000,
      "open": 54.42,
      "high": 54.43,
      "low": 53.74,
      "close": 54.25,
      "volume": 3152757,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1766998800000,
      "open": 52.5,
      "high": 53.94,
      "low": 52.27,
      "close": 53.77,
      "volume": 4210977,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1767085200000,
      "open": 54.73,
      "high": 54.82,
      "low": 53.78,
      "close": 54.38,
      "volume": 3457272,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1767171600000,
      "open": 54.39,
      "high": 54.58,
      "low": 52.64,
      "close": 53.14,
      "volume": 5678937,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1767344400000,
      "open": 54.12,
      "high": 56.61,
      "low": 54.01,
      "close": 56.54,
      "volume": 5897475,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1767603600000,
      "open": 58.07,
      "high": 61.76,
      "low": 57.5,
      "close": 61.44,
      "volume": 9786092,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1767690000000,
      "open": 61.73,
      "high": 65.0075,
      "low": 61.73,
      "close": 63.56,
      "volume": 12385982,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1767776400000,
      "open": 61.65,
      "high": 63.27,
      "low": 61.01,
      "close": 62.74,
      "volume": 10645898,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1767862800000,
      "open": 59.56,
      "high": 61.42,
      "low": 58.47,
      "close": 61.09,
      "volume": 12068641,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1767949200000,
      "open": 61.16,
      "high": 63.785,
      "low": 60.646,
      "close": 63.67,
      "volume": 7025331,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1768208400000,
      "open": 64.155,
      "high": 66.05,
      "low": 63.52,
      "close": 65.67,
      "volume": 8723024,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1768294800000,
      "open": 64.775,
      "high": 66.24,
      "low": 64.4,
      "close": 65.37,
      "volume": 6903886,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1768381200000,
      "open": 65.72,
      "high": 66.95,
      "low": 64.44,
      "close": 64.57,
      "volume": 10871577,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1768467600000,
      "open": 64.46,
      "high": 64.73,
      "low": 63.66,
      "close": 63.81,
      "volume": 11655485,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1768554000000,
      "open": 62.79,
      "high": 63.35,
      "low": 59.95,
      "close": 60.07,
      "volume": 12282479,
      "isLastBar": false,
      "isBarClosed": true
  },
  {
      "time": 1768899600000,
      "open": 59.73,
      "high": 62.295,
      "low": 59.59,
      "close": 62.12,
      "volume": 8466371,
      "isLastBar": true,
      "isBarClosed": true
  }
]