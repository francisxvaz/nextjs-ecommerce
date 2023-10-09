"use server";
import { prisma } from "@/lib/db/prisma";

export async function changeName(id: string, name: string) {
  try {
    await prisma.portfolio.update({
      where: { id },
      data: {
        name: name,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deletePortfolio(id: string) {
  try {
    await prisma.portfolioItem.deleteMany({
      where: { portfolioId: id },
    });

    await prisma.portfolio.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
}
