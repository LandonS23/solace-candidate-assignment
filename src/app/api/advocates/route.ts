import { asc, desc, ilike, or, sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
// import { advocateData } from "../../../db/seed/advocates";
import { NextRequest, NextResponse } from "next/server";
import { Advocate } from "../../../types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchQuery = searchParams.get("search") || "";
  const pageSize =
    Math.abs(parseInt(searchParams.get("pageSize") as string)) || 5;
  const page = Math.abs(parseInt(searchParams.get("page") as string)) || 1;
  const dir = searchParams.get("dir") || "";
  const col: keyof Advocate | null = searchParams.get("col") as keyof Advocate;

  const searchFilter = or(
    ilike(advocates.firstName, `%${searchQuery}%`),
    ilike(advocates.lastName, `%${searchQuery}%`),
    ilike(advocates.city, `%${searchQuery}%`),
    sql`${advocates.degree}::text ILIKE ${`%${searchQuery}%`}`,
    sql`${advocates.specialties}::text ILIKE ${`%${searchQuery}%`}`
  );

  let order;

  if (col && dir) {
    order = dir === "asc" ? asc(advocates[col]) : desc(advocates[col]);
  }

  const data = searchQuery
    ? await db
        .select()
        .from(advocates)
        .where(searchFilter)
        .orderBy(order || asc(advocates.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)
    : await db
        .select()
        .from(advocates)
        .orderBy(order || asc(advocates.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

  const count = await db.select({ count: sql`count(*)` }).from(advocates);

  // const data = advocateData;

  return NextResponse.json({
    data,
    total: Number(count[0].count),
    numPages: Math.ceil(Number(count[0].count) / pageSize),
  });
}
