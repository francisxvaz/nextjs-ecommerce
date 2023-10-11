import React from "react";
import { getCurrentPrice, getProducts } from "./actions";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { percentageDifference } from "@/lib/utils";
import PercentageBadge from "@/components/PercentageBadge";

export default async function LiveProductsPage() {
  const products = await getProducts();
  const isLive = false;
  return (
    <div className="grid w-full grid-cols-8 gap-2">
      {products.map(async (product) => {
          const currentPrice = isLive
          ? await getCurrentPrice(product.name, product.price)
          : product.price;
        
        const percentageDiff = percentageDifference(product.price, currentPrice);
        return (
          <>
            <div className="stats shadow" key={product.id}>
              <div className="stat">
                <div className="stat-title mb-2 text-xs">
                  {formatPrice(product.price)}
                </div>
                <div className="stat-value">
                  <Image
                    src={`${product.imageUrl}`}
                    alt="img"
                    width={30}
                    height={30}
                    className="rounded-full"
                    quality={100}
                    sizes="(max-width:68px) 20px"
                  ></Image>
                </div>
                <div className="stat-desc mt-2">{formatPrice(currentPrice)}
                <PercentageBadge percentageDiff={percentageDiff} />
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}