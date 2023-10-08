# Next.JS 13.4 E-Commerce App

An e-commerce website similar to Amazon that makes heavy use of **Next.js server actions**.

Includes user sign-in with **Next-Auth**, **anonymous shopping carts**, **Prisma client extensions**, and more. Written in **TypeScript**. UI built with **TailwindCSS** & **DaisyUI**.

Learn how to build this project: https://www.youtube.com/watch?v=AaiijESQH5o

```
import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import data from '../.././../../data/latest-shares.json'
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  // try {
  //   data.map(async (share) => {
  //       const name = share.name;
  //       const price = Number(share.price) * 100;
  //       updateProductPrice(name, price)
  //     });

  // } catch (error) {
  //   console.error("Error updating data on Mongo:", error);
  //   res.status(500).end("Internal Server Error");
  // }

  // async function updateProductPrice(name: string, newPrice: number) {
  //   try {
  //     // Find the product
  //     const product = await prisma.product.findFirst({
  //       where: {
  //         name,
  //       },
  //     });
  
  //     if (!product) {
  //       throw new Error("Product not found");
  //     }
  
  //     product.price = newPrice;
  
  //     const updatedProduct = await prisma.product.update({
  //       where: {
  //         id: product.id,
  //       },
  //       data: {
  //         price: newPrice,
  //       },
  //     });
  
  //     return updatedProduct;
  //   } catch (error) {
  //     console.error("Error updating product price:", error);
  //     throw error;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }

}


```

