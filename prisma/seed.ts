// 1. Point this to your custom generated location from earlier
import { PrismaClient } from "../app/generated/prisma"; 

const prisma = new PrismaClient();

async function main() {
  const demoUserId = "user_2T7eXpQ9zR3vKmW4jY8sB1aN";

  try {
    console.log("🚀 Initializing Neon batch pipeline...");

    // Create 25 unique product records under your demo user
    const newProducts = await prisma.product.createMany({
      data: Array.from({ length: 25 }).map((_, i) => ({
        userId: demoUserId, 
        // Generates: "Premium Organic Cassava Starch #1", "#2", etc.
        productName: `Premium Organic Cassava Starch #${i + 1}`, 
        // Generates unique SKUs: CASS-STARCH-001, CASS-STARCH-002, etc.
        sku: `CASS-STARCH-${String(i + 1).padStart(3, '0')}`, 
        price: 34.50,          
        quantity: 85,
        lowStockAt: 15,
      })),
    });

    console.log(`✅ Success! Injected ${newProducts.count} demo items into Neon.`);

  } catch (error) {
    console.error("❌ Critical database batch failure:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();