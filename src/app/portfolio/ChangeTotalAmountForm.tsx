"use client";
import React, { useState } from "react";
import { PortfolioWithItems } from "./page";
import { formatPriceRounded, formatPrice } from "@/lib/format";
import Image from "next/image";
function ChangeTotalAmountForm({
  portfolio,
}: {
  portfolio: PortfolioWithItems;
}) {
  const [totalAmount, settotalAmount] = useState(100000);
  const divideAmountEqually = totalAmount / portfolio.portfolioItems.length;
  let totalAmountNow = 0;

  
  const handleWiseClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, formattedPrice: number ) => {
    e.preventDefault(); // Prevent the default link behavior
    const url = `https://wise.com/au/currency-converter/usd-to-aud-rate?amount=${encodeURIComponent(formattedPrice/100)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col py-4">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-desc">
            suppose I had equally distributed amount of (rounded*)
          </div>
          <div className="stat-value">
            <input
              type="number"
              className="input-bordered input w-full max-w-xs"
              name="totalAmount"
              value={totalAmount}
              onChange={(e) => settotalAmount(Number(e.target.value))}
            />
            <div></div>
            {formatPriceRounded(Math.round(divideAmountEqually), false)} /stock
          </div>
        </div>
      </div>

      <div></div>

      {portfolio.portfolioItems.map((item) => {
        const sharesThatCanBeBought = Math.round(
          divideAmountEqually / (item.price / 100)
        );
        const amountNow = sharesThatCanBeBought * item.product.price;
        totalAmountNow += amountNow;
        return (
          <>
            <div className="stats my-2 shadow">
              <div className="stat">
                <div className="flex gap-3">
                  <div className="stat-title">
                    <figure>
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        width={20}
                        height={20}
                        className="h-10 w-10"
                      />
                    </figure>
                  </div>
                  <div className="stat-value">
                    {formatPriceRounded(amountNow)}
                  </div>
                </div>
                <div className="stat-desc">
                  quantity : {sharesThatCanBeBought}
                </div>
              </div>
            </div>
          </>
        );
      })}
      <a href="#" onClick={(e) => handleWiseClick(e, totalAmountNow)}>
        <div>Total Amount : {formatPrice(totalAmountNow)}</div>
      </a>
    </div>
  );
}

export default ChangeTotalAmountForm;
