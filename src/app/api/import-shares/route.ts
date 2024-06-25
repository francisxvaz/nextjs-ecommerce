import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import data from "../.././../../data/latest-shares.json";

const prisma = new PrismaClient();

type ProductType = {
  name: string;
  price: number;
  percentageChange: number;
  imageUrl: string;
  description: string;
};

async function addProducts(product: ProductType) {
  const { name, price, imageUrl, percentageChange, description } = product;
  await prisma.product.create({
    data: {
      name,
      price,
      imageUrl,
      percentageChange,
      description,
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    await Promise.all(data.map(async (share) => {
      const name = share.name;
      const price = Number(share.price) * 100;
      const percentageChange = Number(share.percentageChange);
      const description = share.name;
      const imageUrl = `https://raw.githubusercontent.com/francisxvaz/nextjs-ecommerce/c1300ded38bb29139706bbb2c95d9d9d0b7b0471/public/logos/${name}.svg`;

      const product: ProductType = {
        name,
        price,
        percentageChange,
        description,
        imageUrl,
      };

      await addProducts(product);
    }));

    return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating data on Mongo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';