import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      required: true,
    },
    farmers: {
      type: Number,
      required: true,
    },
    strat: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

let Game;
try {
  Game = mongoose.model("Game");
} catch (error) {
  Game = mongoose.model("Game", gameSchema);
}

export default Game;
