import React from "react";
import { getCurrentPrice, getProducts } from "./actions";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { percentageDifference } from "@/lib/utils";
import PercentageBadge from "@/components/PercentageBadge";
import Link from "next/link";

export default async function LiveProductsPage() {
  const products = await getProducts();
  const isLive = false;
  return (
    <div className="grid w-full grid-cols-4 gap-2 md:grid-cols-8">
      {products.map(async (product) => {
        const currentPrice = isLive
          ? await getCurrentPrice(product.name, product.price)
          : product.price;

          


        const percentageDiff = percentageDifference(
          currentPrice,
          product.price
        );
        return (
          <>
            <div className="stats shadow" key={product.id}>
              <div className="stat">
                <Link
                  href={`https://trading.hellostake.com/us-equity/${product.name}`}
                  target="_blank"
                  className="hidden md:block"
                >
                  <div className="relative top-0 w-5 rounded-full bg-green-300 text-center">
                    s
                  </div>
                </Link>

                <div className="stat-title mb-2 text-xs">
                  {formatPrice(product.price)}
                </div>
                <div className="stat-value">
                  <Link
                    href={`https://finance.yahoo.com/quote/${product.name}`}
                    target="_blank"
                  >
                    <Image
                      src={`${product.imageUrl}`}
                      alt="img"
                      width={30}
                      height={30}
                      className="rounded-full"
                      quality={100}
                      sizes="(max-width:68px) 20px"
                    ></Image>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="stat-desc mt-2">
                    {formatPrice(currentPrice)}
                  </div>
                  <div>
                    <PercentageBadge percentageDiff={percentageDiff} />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
