import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { MAX_FREE_SCANS } from "@/constants";

export const increaseScanLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      userId
    },
    select: {
      count: true
    }
  })

  if (user) {
    await db.user.update({
      where: {
        userId
      },
      data: {
        count: user.count + 1
      }
    })
  } else {
    throw new Error("Please sign in to use Bycel Receipt Scanner");
  }
}


export const checkScanLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      userId
    },
    select: {
      count: true
    }
  })

  if (!user || user.count < MAX_FREE_SCANS) {
    return true;
  } else {
    return false;
  }
}