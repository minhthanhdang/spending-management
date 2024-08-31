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

    const { values } = body;

    if (!values) {
      return new NextResponse("Invalid Item", { status: 400 });
    }

    
    if (!values.date) {
      values.date = null;
    }

    const formattedPrice = parseFloat(values.price).toFixed(2);
    if (!formattedPrice) {
      return new NextResponse("Invalid Price", { status: 400 })
    }
    console.log(formattedPrice)
    
    const added = await db.item.create({
      data: {
        name: values.name,
        price: parseFloat(values.price).toFixed(2),
        date: values.date,
        category: values.category,
        seller: values.seller,
        sheetId: values.sheetId || null,
      }
    })

    return NextResponse.json(added)

  } catch (error) {
    console.error(error);
    return new NextResponse("Error adding item", { status: 500 });
  }
}