"use server";
import { prisma } from "@/lib/prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: products };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch products" };
  }
}
