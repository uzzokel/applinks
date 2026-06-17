// app/actions/products.ts
"use server"; 

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export async function createProductAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const productName = formData.get("productName") as string;
  const priceInput = formData.get("price") as string;
  const quantityInput = formData.get("quantity") as string;
  const lowStockAtInput = formData.get("lowStockAt") as string;
  
  // 💡 Expects a plain text URL string generated from Vercel
  const imageUrl = formData.get("imageUrl") as string; 

  try {
    const newProduct = await prisma.product.create({
      data: {
        userId, 
        productName,
        sku: `SKU-${Date.now()}`,
        price: parseFloat(priceInput), 
        quantity: parseInt(quantityInput) || 0,
        lowStockAt: parseInt(lowStockAtInput) || 5,
        imageUrl: imageUrl || null, // 💡 Saves the text link to Neon
      },
    });

    revalidatePath("/features"); 
    return { success: true, product: newProduct };
  } catch (error) {
    console.error("Neon DB Error:", error);
    return { success: false, error: "Database save failed." };
  }
}



