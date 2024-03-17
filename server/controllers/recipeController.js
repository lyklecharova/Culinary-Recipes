const express = require("express");
const router = express.Router();
const { isLogUser } = require("../middleware/guards");

const Recipe = require('../models/Recipe');

// Create recipe - Logged
router.post("/add", isLogUser, async (req, res) => {
    const recipeDetails = req.body;
    try {
        console.log(recipeDetails);
        await Recipe.create({ ...recipeDetails, ownerId: req.userId });
    } catch (error) {
        console.log(error);
    }
    res.status(200).send("Send");
});

router.get("/", async (req, res) => {
    const allRecipes = await Recipe.find();
    // console.log(allRecipes);
    res.json(allRecipes);
});

router.get("/:id", async (req, res) => {
    try {
        const recipeId = req.params.id;
        const oneRecipe = await Recipe.findById(recipeId);
        res.json(oneRecipe);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Edit recipe - Logged and owner
router.put("/:id", isLogUser, async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipeDetails = await Recipe.findById(recipeId);
        if (recipeDetails.ownerId != req.userId) {
            throw new Error('Unauthorized');
        }
        const updateInfo = req.body;
        // new:true - returns the modified value
        const editedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateInfo, {
            new: true
        })
        res.json(editedRecipe);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Delete recipe - Logged and owner

router.delete("/:id", isLogUser, async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipeDetails = await Recipe.findById(recipeId);
        if (recipeDetails.ownerId != req.userId) {
            throw new Error('Unauthorized');
        }

        await Recipe.findByIdAndDelete(recipeId);
        res.json({ message: "Delete succesfully" });
    } catch (error) {
        // console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;