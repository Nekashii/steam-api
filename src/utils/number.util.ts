export function trim(value: number, precision = 1) {
  const multiplier = 10 ** precision
  return Math.floor(value * multiplier) / multiplier
}
