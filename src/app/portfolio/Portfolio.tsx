import React from "react";
import { PortfolioWithItems } from "./page";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import PortfolioName from "./PortfolioName";
import PortfolioDelete from "./PortfolioDelete";
import ChangeTotalAmountForm from "./ChangeTotalAmountForm";

function percentageDifference(buyPrice: number, currentPrice: number): number {
  const difference = Math.abs(buyPrice - currentPrice);
  const average = (buyPrice + currentPrice) / 2;
  const percentageDiff = (difference / average) * 100;
  return percentageDiff;
}

function Portfolio({ portfolio }: { portfolio: PortfolioWithItems }) {
  let totalQuantity = 0;
  let totalBuyPrice = 0;
  let totalCurrentPrice = 0;
  return (
    <div className="grid py-3 md:flex justify-around">
      <div>
        <div className="flex items-center gap-2 text-2xl uppercase">
          <PortfolioName
            name={portfolio.name}
            id={portfolio.id}
          ></PortfolioName>
          <PortfolioDelete id={portfolio.id}></PortfolioDelete>
        </div>
        {portfolio.portfolioItems.map((item) => {
          totalQuantity += item.quantity;
          totalBuyPrice += item.price;
          totalCurrentPrice += item.product.price;

          return (
            <div key={item.id} className="flex gap-4 p-2">
              <div>
                <figure>
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    width={40}
                    height={40}
                    className="h-40 w-40"
                  />
                </figure>
              </div>
              <div>
                <div>buy price : {formatPrice(item.price)}</div>
                <div>quantity : {item.quantity}</div>
                <div>
                  current price : {formatPrice(item.product.price)}(
                  {percentageDifference(item.price, item.product.price)}%)
                </div>
                <a
                  href={`https://trading.hellostake.com/us-equity/${item.product.name}`}
                  target="_blank"
                  className="btn-primary btn"
                >
                  Buy on Stake
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-slate-100 p-2 rounded-lg">
        <div>Total Quantity: {totalQuantity} shares</div>
        <div>Total Buy Price: {formatPrice(totalBuyPrice)}</div>
        <div>Total Current Price: {formatPrice(totalCurrentPrice)}</div>
        <ChangeTotalAmountForm portfolio={portfolio} />
      </div>
    </div>
  );
}

export default Portfolio;
