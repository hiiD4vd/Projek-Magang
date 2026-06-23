"use server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: "Failed to fetch products" };
  }
}
