// lib/db.ts
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

// 1. Create a helper function to ensure Turbopack evaluates process.env *on every query request*
function getPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "❌ CRITICAL: DATABASE_URL is missing! Ensure your .env file is at the root and your terminal was hard-restarted."
    );
  }

  // Pass it safely to the driver adapter
  const adapter = new PrismaNeon({ connectionString })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

// 2. Export the global instance cleanly
export const prisma = globalForPrisma.prisma ?? getPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma





// import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { Pool } from "@neondatabase/serverless";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const connectionString = process.env.DATABASE_URL;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaNeon(pool);

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;