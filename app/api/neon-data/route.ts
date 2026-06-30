import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return NextResponse.json({ error: "DATABASE_URL is missing" }, { status: 500 });
    }

    const sql = neon(databaseUrl);
    
    // Test with a basic system query first to ensure the connection works 
    // even if your tables are empty!
    const data = await sql`SELECT * FROM "Product" LIMIT 10;`;

    return NextResponse.json({ records: data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}