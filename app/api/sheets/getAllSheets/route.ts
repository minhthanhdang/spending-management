
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sheets = await db.sheet.findMany({
      where: {
        userId
      }
    })

    console.log('sheets', sheets)


    if (!sheets) {
      console.log('no sheets')
      return NextResponse.json([]);
    }

    return NextResponse.json(sheets);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}