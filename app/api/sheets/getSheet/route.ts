
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Item } from "@prisma/client";

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return new NextResponse("Invalid request", { status: 400 })
    }
    console.log(id)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sheet = await db.sheet.findFirst({
      where: {
        id: parseInt(id)
      }
    })

    if (!sheet) {
      return new NextResponse("Internal Server Error", { status: 500 })
    }
    if (sheet.userId != userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(sheet);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}