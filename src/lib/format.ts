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
