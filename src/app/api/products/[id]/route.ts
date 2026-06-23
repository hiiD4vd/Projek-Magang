import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, description, currentPrice, oldPrice, type, icons, imagePath, isAvailable } = body;
    
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        currentPrice: parseFloat(currentPrice),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        type,
        icons,
        imagePath,
        isAvailable
      }
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
