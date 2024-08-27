import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      required: true,
    },
    players: {
      type: Number,
      required: true,
    },
    strategy: {
      type: Boolean,
      required: true,
    },
    strategyName: {
      type: String,
      maxlength: 20,
      required: function () {
        return this.strategy;
      },
    },
    strategyLink: {
      type: String,
      match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      required: function () {
        return this.strategy;
      },
    },
    rounds: {
      type: Number,
      required: true,
    },
    robloxUsername: {
      type: String,
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
