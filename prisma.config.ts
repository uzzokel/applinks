import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Hardcoded connection string fallback to bypass local environment isolation bugs
    url: "postgresql://neondb_owner:npg_5qHQwlRJxzu8@ep-spring-pond-apr5wuvf-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true",
  },
});
