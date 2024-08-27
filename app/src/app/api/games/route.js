import Game from "@/models/Game";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Adjust this import path if necessary

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
    const {
      mode,
      players,
      strategy,
      strategyName,
      strategyLink,
      rounds,
      robloxUsername,
    } = body;

    // Validate input
    if (!mode) {
      return NextResponse.json({ error: "Mode is required" }, { status: 400 });
    }

    if (!players || isNaN(parseInt(players))) {
      return NextResponse.json(
        { error: "Valid number of players is required" },
        { status: 400 }
      );
    }

    if (typeof strategy !== "boolean") {
      return NextResponse.json(
        { error: "Valid strategy selection is required" },
        { status: 400 }
      );
    }

    if (!rounds || isNaN(parseInt(rounds))) {
      return NextResponse.json(
        { error: "Valid number of rounds is required" },
        { status: 400 }
      );
    }

    if (!robloxUsername) {
      return NextResponse.json(
        { error: "Roblox username is required" },
        { status: 400 }
      );
    }

    const gameData = {
      mode,
      players: parseInt(players),
      strategy,
      strategyName: strategy ? strategyName : undefined,
      strategyLink: strategy ? strategyLink : undefined,
      rounds: parseInt(rounds),
      robloxUsername,
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

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all games, sorted by creation date (newest first)
    const games = await Game.find().sort({ createdAt: -1 });

    return NextResponse.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
