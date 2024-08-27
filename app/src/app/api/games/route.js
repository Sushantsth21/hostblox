import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Game from "@/models/Game"; // Adjust this import path if necessary

export async function POST(request) {
  try {
    // Connect to MongoDB
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const body = await request.json();
    const { mode, farmers, strat, otherMode } = body.formData;

    // Validate input
    if (!mode) {
      return NextResponse.json({ error: "Mode is required" }, { status: 400 });
    }

    if (mode === "Other" && !otherMode) {
      return NextResponse.json(
        { error: "Other mode specification is required" },
        { status: 400 }
      );
    }

    if (!farmers || isNaN(parseInt(farmers))) {
      return NextResponse.json(
        { error: "Valid number of farmers is required" },
        { status: 400 }
      );
    }

    if (strat !== "Yes" && strat !== "No") {
      return NextResponse.json(
        { error: "Valid strategy selection is required" },
        { status: 400 }
      );
    }

    const gameData = {
      mode: mode === "Other" ? otherMode : mode,
      farmers: parseInt(farmers),
      strat: strat === "Yes",
    };

    const game = new Game(gameData);
    const savedGame = await game.save();

    return NextResponse.json(
      { message: "Game created successfully", game: savedGame },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in game submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
