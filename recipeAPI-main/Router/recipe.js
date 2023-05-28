const router = require("express").Router();
const Recipes = require("../Model/Recipe");
const Rating = require("../Model/Rating");
const {
  verifyToken,
  verifyTokenAndAuthorization
}= require("./verifyToken");


//Create Recipe
router.post("/createRecipe",async ({ body: { recipeTitle, ingredient, howToMake } }, res) => {
    const newRecipe = new Recipes({
      recipeTitle,
      ingredient,
      howToMake
    });

    try {
      const savedRecipe = await newRecipe.save();
      const { data } = savedRecipe._doc;
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({
        message: "Something error",
        error,
      });
    }
  }
);

//Get Recipe
router.get("/:id", async(req,res)=>{
  try{
    const recipe = await Recipes.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error){
    res.status(500).json(error);
  }

})

//Find recipe with ingredient as a search query
router.post("/searchRecipeByIngredient", async (req, res) => {
  const { ingredient } = req.body;

  try {
    const recipes = await Recipes.find({
      ingredient: { $regex: ingredient, $options: "i" },
    });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
//Rating
router.post("/:id/addRating", async(req,res)=>{
  const {id} = req.params;
  const {userId, rating} = req.body;
  try {
    const newRating = new Rating({
      userId,
      rating
    })
    const savedRating = await newRating.save();

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      id,
      { $push: { ratings: savedRating._id } },
      { new: true}
    );
    res.status(200).json(updatedRecipe);
  }catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
);
module.exports = router;