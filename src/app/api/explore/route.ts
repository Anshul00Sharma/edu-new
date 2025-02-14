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
      const response = await gptService.getExploreContent(query, userContext as UserContext);
      return NextResponse.json(response);
    } catch (error) {
      console.error("Explore error:", error);
      return NextResponse.json(
        { error: "Failed to explore topic" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in explore API:", error);
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}
