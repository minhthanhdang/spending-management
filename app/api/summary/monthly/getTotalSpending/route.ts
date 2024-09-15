
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { MONTHS } from "@/lib/constants";

export async function GET(
  req: Request
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const nowDate = new Date()
    const currentMonth = nowDate.getMonth()

    let totalSpendings: number[] = []

    for (let i = currentMonth; i >= 0; i--){
      const sheets = await db.sheet.findMany({
        where: {
          userId,
          month: i,
        },
        select: {
          totalSpending: true,
        }
      })

      if (!sheets) {
        totalSpendings.push(0.0)
      } else {
        let sum = 0;
        sheets.forEach((sheet) => {
          sum += sheet.totalSpending.toNumber()
        })
        totalSpendings.push(sum);
      }
    }

    totalSpendings = totalSpendings.reverse()

    return NextResponse.json({totalSpendings});
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}