const recipeModel = require('../models/Recipe.js');

const getRecipes = async (req, res) => {
  const { user } = req;
  const recipes = await recipeModel.recipes();

  return recipes
    ? res.render('home', { user, recipes })
    : res.render('home', { message: 'No recipes found.' });
};

// const getRecipe = async (req, res) => {
//   const { id } = req.params;
//   const recipe = await recipeModel.recipe();

//   return recipe ? res.render('/', { recipe }) : res.render('/', { message: 'Recipe found.' });
// };

const createRecipe = async (req, res) => {
  const { recipe } = req.body;

  if (!recipeModel.isRecipeValid(recipe)) res.render('/', { message: 'Invalid recipe data.' });

  const result = await recipeModel.create(recipe);

  return result ? res.redirect('/') : res.render('/', { message: 'Recipe could not be added.' });
};

module.exports = {
  getRecipes,
  createRecipe,
};