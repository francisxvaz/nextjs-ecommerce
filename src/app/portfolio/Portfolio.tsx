import React from "react";
import { PortfolioWithItems } from "./page";
import { formatPrice } from "@/lib/format";

function Portfolio({ portfolio }: { portfolio: PortfolioWithItems }) {
  return (
    <>
      <div>{portfolio.name}</div>
      {portfolio.portfolioItems.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.productId}</div>
            <div>{formatPrice(item.price)}</div>
            <div>{item.quantity}</div>
          </div>
        );
      })}
    </>
  );
}

export default Portfolio;
