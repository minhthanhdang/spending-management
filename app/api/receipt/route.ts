import { NextResponse } from "next/server";
import OpenAI from "openai";
import { config } from "process";
import { auth } from "@clerk/nextjs/server";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { db } from "@/lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: "You must look at the receipt and return the following information: the provider, the date, the name and total price of every items purchased, and the total amount of the receipt, in json format. If any of the information is not available, you can return the information as null."
};

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { message } = body;
    console.log("message", message);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!message) {
      return new NextResponse("No image uploaded", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [instructionMessage, message]
    })

    const dataString = response.choices[0]?.message?.content;
    if (!dataString) {
      return new NextResponse("Error processing image", { status: 500 });
    }

    console.log(dataString)
    let cleanData = dataString.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleanData);

    const provider = data?.provider;
    const date = data?.date;
    const items = data?.items;
    const total_amount = data?.total_amount;

    const formattedItems = [];

    for (const item of items) {
      if (!item.name || !item.price) {
        continue
      }

      const result = await db.item.create({
        data: {
          name: item.name,
          price: String(item.price),
          date: new Date(date),
          seller: provider,
        }
      })

      formattedItems.push(result);
    }

    console.log("formatted data", formattedItems);
    console.log("received", data);

    return NextResponse.json(formattedItems);

  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}