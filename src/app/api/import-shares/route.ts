import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import data from "../.././../../data/latest-shares.json";

interface ShareData {
  name: string;
  price: string;
  percentageChange: string;
}

interface ProductType {
  name: string;
  price: number;
  percentageChange: number;
  imageUrl: string;
  description: string;
}

// Create a single Prisma client instance
let prismaInstance: PrismaClient | undefined;

function getPrismaInstance() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}

function createProductFromShare(share: ShareData): ProductType {
  return {
    name: share.name,
    price: Math.round(Number(share.price) * 100), // Ensure integer for price in cents
    percentageChange: Number(share.percentageChange),
    description: share.name,
    imageUrl: `https://raw.githubusercontent.com/francisxvaz/nextjs-ecommerce/c1300ded38bb29139706bbb2c95d9d9d0b7b0471/public/logos/${share.name}.svg`,
  };
}

async function addProduct(product: ProductType): Promise<void> {
  const prisma = getPrismaInstance();
  await prisma.product.create({ data: product });
}

async function addProducts(products: ProductType[]): Promise<void> {
  const prisma = getPrismaInstance();
  await prisma.product.createMany({ data: products });
}

export async function GET(req: NextRequest) {
  try {
    const products = data.map(createProductFromShare);

    // Use createMany for better performance
    await addProducts(products);

    return NextResponse.json({ message: "Data updated successfully", count: products.length }, { status: 200 });
  } catch (error) {
    console.error("Error updating data in database:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';