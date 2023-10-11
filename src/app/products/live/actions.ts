import { prisma } from "@/lib/db/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });
  return products;
}

export async function getCurrentPrice(name: string, price: number): Promise<number> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${name}?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance`;

  try {
    const response = await fetch(url, { cache: "no-cache" });
    const data = await response.json();
    const currentPrice = +data.chart.result[0].meta.regularMarketPrice;
    return currentPrice * 100;
  } catch (error) {
    console.error("Error fetching data:", error);
    return price;
  }
}