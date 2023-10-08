"use server";
import { prisma } from "@/lib/db/prisma";

export async function changeName(id: string, name:string) {
  await prisma.portfolio.update({
    where: {id},
    data: {
      name: name      
    }
})
}
