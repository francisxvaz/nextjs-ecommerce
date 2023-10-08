"use server";

import { ShoppingCart, createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function addToPortfolio(cart: ShoppingCart | null) {
  const session = await getServerSession(authOptions);
  //add portfolio
  if (session) {
    const newPortfolio = await prisma.portfolio.create({
      data: { userId: session.user.id, name: "example" },
    });

    //add portfolio items
    cart?.items.map(async (x) => {
      console.log(x.product.name);
      await prisma.portfolioItem.create({
        data: {
          portfolioId: newPortfolio.id,
          productId: x.productId,
          price: x.product.price,
          quantity: x.quantity,
        },
      });
    });

    //delete the cart
    await prisma.cart.delete({
      where: { id: cart?.id },
    });
  }
}

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }

  revalidatePath("/cart");
}
