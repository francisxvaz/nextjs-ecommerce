"use client";
import React, { useState } from "react";
import { PortfolioWithItems } from "./page";
import { formatNormalPrice, formatPrice } from "@/lib/format";
import Image from "next/image";
function ChangeTotalAmountForm({
  portfolio,
}: {
  portfolio: PortfolioWithItems;
}) {
  const [totalAmount, settotalAmount] = useState(90000);
  const divideAmountEqually = totalAmount / portfolio.portfolioItems.length;
  let totalAmountNow = 0;
  return (
    <div className="flex flex-col">
      <span className="text-xs">
        suppose I had equally distributed amount of (rounded*)
      </span>
      <div>
        <input
            type="number"
            name="totalAmount"
            value={totalAmount}
            onChange={(e) => settotalAmount(Number(e.target.value))}
        />
        {formatNormalPrice(divideAmountEqually)} /stock
      </div>

      
     

      {portfolio.portfolioItems.map((item) => {
        const sharesThatCanBeBought = Math.floor(
          divideAmountEqually / (item.price / 100)
        );
        const amountNow = sharesThatCanBeBought * item.product.price;
        totalAmountNow += amountNow;
        return (
          <>
            <div className="flex gap-2 py-2">
              <div className="flex w-full justify-between">
                <div>
                <figure>
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    width={20}
                    height={20}
                    className="h-14 w-14"
                  />
                </figure>
                </div>
                <div>
                <div><span>shares </span>{sharesThatCanBeBought}</div>
              <div>Amount Now: {formatPrice(amountNow)}</div>
                </div>
                </div>
              
            </div>
          </>
        );
    })}
    <div>Total Amount : {formatPrice(totalAmountNow)}</div>
    </div>
  );
}

export default ChangeTotalAmountForm;
