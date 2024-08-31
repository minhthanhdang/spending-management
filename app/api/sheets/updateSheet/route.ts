


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

    const { sheetId, rawItems } = await req.json();

    const items = JSON.parse(rawItems)

    if (!sheetId) {
      return new NextResponse("Invalid sheet", { status: 400 })
    }

    if (!items) {
      return new NextResponse("Nothing to update", { status: 401 });
    }

    const sheet = await db.sheet.findFirst({
      where: {
        id: parseInt(sheetId)
      }
    })

    if (!sheet) {
      return new NextResponse("Internal Server Error", { status: 500 })
    }
    if (sheet.userId != userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    items.forEach(async (item: Item) => {
      await db.item.update({
        where: {
          id: item.id
        },
        data: {
          name: item.name,
          price: item.price,
          category: item.category,
          date: item.date,
          seller: item.seller
        }
      })
    }) 

    return NextResponse.json(sheet);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}