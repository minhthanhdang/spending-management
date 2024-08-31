
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Item } from "@prisma/client";

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { title, items, description } = body;
    console.log(items)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sheets = await db.sheet.create({
      data: {
        userId,
        title,
        description
      }
    })

    const sheetId = sheets.id;

    if (!sheetId) {
      return new NextResponse("Internal Server Error", { status: 500 })
    }

    console.log('prev', items)
    let parseItems = JSON.parse(items);
    console.log(parseItems)


    parseItems.forEach(async (item: Item) => {
      await db.item.create({
        data: {
          name: item.name,
          price: item.price,
          date: item.date,
          category: item.category,
          seller: item.seller,
          sheetId
        }
      })
    })

    return NextResponse.json({sheetId});
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}