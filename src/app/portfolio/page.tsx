import { prisma } from '@/lib/db/prisma'
import React from 'react'
import Portfolio from './Portfolio';
import { Prisma } from '@prisma/client';

export type PortfolioWithItems = Prisma.PortfolioGetPayload<{
    include: { portfolioItems: true };
  }>;

export default async function PortfoliosPage() {
  let portfolios: PortfolioWithItems[] | null = null;  

  portfolios = await prisma.portfolio.findMany(
    {include: { portfolioItems: true} } 
  ) ;

  return portfolios.map(portfolio => {
    return <Portfolio portfolio={portfolio} />
  })
  
}

