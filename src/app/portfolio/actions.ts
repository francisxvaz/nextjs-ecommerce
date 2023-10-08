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
