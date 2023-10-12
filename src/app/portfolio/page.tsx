import { prisma } from "@/lib/db/prisma";
import React from "react";
import Portfolio from "./Portfolio";
import { Prisma, Product } from "@prisma/client";

export type PortfolioItemProduct = Prisma.PortfolioItemGetPayload<{
  include: { product: false };
}>;

export type PortfolioWithItems = Prisma.PortfolioGetPayload<{
  include: { portfolioItems: { include: { product: true } } };
}>;

export default async function PortfoliosPage() {
  let portfolios: PortfolioWithItems[] | null = null;

  portfolios = await prisma.portfolio.findMany({

    include: { portfolioItems: { include: { product: true } } },
  });

  return portfolios.map((portfolio) => {
    
    return (
      <div key={portfolio.id}>
        <Portfolio portfolio={portfolio} />
      </div>
    );
  });
}
