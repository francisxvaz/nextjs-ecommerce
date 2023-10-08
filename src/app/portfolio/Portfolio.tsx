import React from "react";
import { PortfolioWithItems } from "./page";
import { formatPrice } from "@/lib/format";
import Image from "next/image";

function Portfolio({ portfolio }: { portfolio: PortfolioWithItems }) {
  return (
    <>
      <div className="text-2xl uppercase">{portfolio.name}</div>
      {portfolio.portfolioItems.map((item) => {
        function percentageDifference(buyPrice: number, currentPrice: number): number {
          const difference = Math.abs(buyPrice - currentPrice);
          const average = (buyPrice + currentPrice) / 2;
          const percentageDiff = (difference / average) * 100;
          return percentageDiff;
        }

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
              <div>current price : {formatPrice(item.product.price)}({percentageDifference(item.price, item.product.price)}%)</div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Portfolio;
