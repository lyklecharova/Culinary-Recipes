const mongoose = require('mongoose');
const User = require('./User');

const recipesSchema = new mongoose.Schema({
	title: String,
	image: String,
	url: String,
	// additionalInfo: String,
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: User }
});

const Recipe = mongoose.model("Recipe", recipesSchema);

module.exports = Recipe;