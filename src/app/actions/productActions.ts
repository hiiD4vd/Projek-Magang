"use server";
import { prisma } from "@/lib/prisma";

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
