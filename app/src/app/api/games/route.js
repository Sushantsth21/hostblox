import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Game from "@/models/Game"; // Adjust this import path if necessary

// Create a connection function
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // If already connected, use current connection
    return;
  }

  // Check if MONGODB_URI is defined
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

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
