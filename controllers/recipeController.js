const recipeModel = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await recipeModel.findAllRecipes();
  res.render('home', { user: req.user, recipes });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeModel.findRecipeById(id);
  res.render('recipeDetails', { user: req.user, recipes });
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeModel.findRecipeById(id);
  res.render('editRecipe', { user: req.user, recipes });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeModel.findRecipeById(id);
  res.render('deleteRecipe', { user: req.user, recipes });
};

const searchRecipe = async (req, res) => {
  const recipes = await recipeModel.searchRecipe(req.query.q);
  res.render('searchRecipe', { user: req.user, message: 'Nenhuma receita encontrada', recipes });
};

const newRecipe = async (req, res) => {
  res.render('newRecipe', { user: req.user });
};

module.exports = {
  listAllRecipes,
  recipeDetail,
  editRecipe,
  deleteRecipe,
  searchRecipe,
  newRecipe,
};
