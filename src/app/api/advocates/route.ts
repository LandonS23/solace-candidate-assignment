import { asc } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
// import { advocateData } from "../../../db/seed/advocates";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const pageSize =
    Math.abs(parseInt(searchParams.get("pageSize") as string)) || 5;
  const page = Math.abs(parseInt(searchParams.get("page") as string)) || 1;

  const data = await db
    .select()
    .from(advocates)
    .orderBy(asc(advocates.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  // const data = advocateData;

  return NextResponse.json({ data });
}
