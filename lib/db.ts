import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '../app/generated/prisma'

const connectionString = 
  "postgresql://neondb_owner:npg_5qHQwlRJxzu8@ep-spring-pond-apr5wuvf-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true";

function getPrismaClient() {
  // Pass the connectionString object directly to PrismaNeon instead of a Pool instance
  const adapter = new PrismaNeon({ connectionString })
  
  // Fixed: Instantiating directly from the imported PrismaClient class
  return new PrismaClient({ adapter })
}

export const prisma = getPrismaClient();