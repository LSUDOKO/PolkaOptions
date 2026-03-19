/** Standard normal CDF approximation */
function normalCDF(x: number): number {
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911

  const sign = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.sqrt(2)

  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

  return 0.5 * (1.0 + sign * y)
}

/** Standard normal PDF */
function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
}

export interface BSResult {
  callPrice: number
  putPrice: number
  delta: number
  gamma: number
  theta: number
  vega: number
  rho: number
}

/**
 * Black-Scholes pricing with Greeks
 * @param S - Spot price
 * @param K - Strike price
 * @param T - Time to expiry (years)
 * @param r - Risk-free rate
 * @param sigma - Volatility
 */
export function blackScholes(S: number, K: number, T: number, r: number, sigma: number): BSResult {
  if (T <= 0 || sigma <= 0) {
    return { callPrice: Math.max(S - K, 0), putPrice: Math.max(K - S, 0), delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0 }
  }

  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)

  const Nd1 = normalCDF(d1)
  const Nd2 = normalCDF(d2)
  const nd1 = normalPDF(d1)

  const callPrice = S * Nd1 - K * Math.exp(-r * T) * Nd2
  const putPrice = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1)

  const delta = Nd1
  const gamma = nd1 / (S * sigma * Math.sqrt(T))
  const theta = (-(S * nd1 * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * Nd2) / 365
  const vega = S * nd1 * Math.sqrt(T) / 100
  const rho = K * T * Math.exp(-r * T) * Nd2 / 100

  return { callPrice, putPrice, delta, gamma, theta, vega, rho }
}
