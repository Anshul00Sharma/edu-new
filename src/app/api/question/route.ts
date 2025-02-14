import { NextResponse } from "next/server";
import { GPTService } from "@/lib/server/gptService";
import { UserContext } from "@/types";

const gptService = new GPTService();

export async function POST(request: Request) {
  try {
    const { query, userContext } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    try {
      // Calculate difficulty level based on age
      const level = userContext.age < 12 ? 1 
        : userContext.age < 16 ? 2 
        : userContext.age < 20 ? 3 
        : 4;

      const question = await gptService.getPlaygroundQuestion(query, level, userContext as UserContext);
      return NextResponse.json(question);
    } catch (error) {
      console.error("Question generation error:", error);
      return NextResponse.json(
        { error: "Failed to generate question" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in question API:", error);
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}
