const express = require("express");
const router = express.Router();

const recipeController = require('../controllers/recipeController');
router.use(`/recipe`, recipeController);

const userController = require('../controllers/userController');
router.use(`/user`, userController);

module.exports = router;