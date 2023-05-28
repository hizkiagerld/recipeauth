const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    recipeTitle: {
      type: String,
      required: true,
      unique: false,
    },
    ingredient: {
      type: String,
      required: true,
      unique: false,
    },
    howToMake: {
      type: String,
      required: true,
      unique: false,
    },
    ratings : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Rating"
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipes", recipeSchema);