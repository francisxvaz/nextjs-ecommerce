export function percentageDifference(
  buyPrice: number,
  currentPrice: number
): number {
  const difference = buyPrice - currentPrice;
  const average = (buyPrice + currentPrice) / 2;
  const percentageDiff = (difference / average) * 100;

  return percentageDiff;
}
