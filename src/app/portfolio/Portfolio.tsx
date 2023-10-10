import React from "react";
import { PortfolioWithItems } from "./page";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import PortfolioName from "./PortfolioName";
import PortfolioDelete from "./PortfolioDelete";
import ChangeTotalAmountForm from "./ChangeTotalAmountForm";
import FinanceSites from "@/components/FinanceSites";

function percentageDifference(
  buyPrice: number,
  currentPrice: number
): React.ReactNode {
  const isNegative = buyPrice - currentPrice < 0;
  const difference = Math.abs(buyPrice - currentPrice);
  const average = (buyPrice + currentPrice) / 2;
  const percentageDiff = ((difference / average) * 100).toFixed(2); // Round to 2 decimal places
  const className = isNegative ? "bg-green-400" : "bg-red-400";

  return (
    <span className={`badge text-xs text-white ${className}`}>
      {percentageDiff}%
    </span>
  );
}

function Portfolio({ portfolio }: { portfolio: PortfolioWithItems }) {
  let totalQuantity = 0;
  let totalBuyPrice = 0;
  let totalCurrentPrice = 0;
  return (
    <div className="grid justify-around py-3 md:flex">
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
                <FinanceSites name={item.product.name} />
              </div>
              <div>
                <div>buy price : {formatPrice(item.price)}</div>
                <div>quantity : {item.quantity}</div>
                <div>
                  current price : {formatPrice(item.product.price)}
                  {percentageDifference(item.price, item.product.price)}
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

      <div className="">
        <div className="stats bg-primary text-white shadow">
          <div className="stat">
            <div className="stat-title">Buy Price: {formatPrice(totalBuyPrice)}</div>
            <div className="stat-value">{formatPrice(totalCurrentPrice)}</div>
            <div className="stat-desc">{totalQuantity} shares</div>
          </div>
        </div>
       
        <ChangeTotalAmountForm portfolio={portfolio} />
      </div>
    </div>
  );
}

export default Portfolio;
