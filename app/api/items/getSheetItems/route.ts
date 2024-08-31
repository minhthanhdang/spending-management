import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { id } = body;

    if (!id) {
      return new NextResponse("Invalid Sheet", { status: 400 });
    }
    
    const items = await db.item.findMany({
      where: {
        sheetId: parseInt(id)
      }
    })

    return NextResponse.json(items)

  } catch (error) {
    console.error(error);
    return new NextResponse("Error adding item", { status: 500 });
  }
}