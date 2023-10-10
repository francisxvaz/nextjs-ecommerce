export function formatPrice(price: number) {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatNormalPrice(price: number) {
  return (price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function formatPriceRounded(price: number, isdivisble: boolean = true) {
  const p = isdivisble ? price/100 : price;
  return (p).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
