const recipesModel = require('../models/cooksModel');
const { listSpecificRecipe } = require('../models/cooksModel');

const listarReceitas = async (req, res) => {
  const cooks = await recipesModel.listCook();
  return res.render('home', { cooks, user: req.user });
};

const viewRecipesUser = async (req, res) => {
  const cooks = await recipesModel.listSpecificRecipe(Number(req.params.id));
  res.render('recipes', { cooks, user: req.user });
};

const searchRecipes = async (req, res) => {
  const cooks = await recipesModel.getSpecificRecipe(req.query.q);
  res.render('search', { cooks, user: req.user });
};

const recipeRegister = async (req, res) => {
  res.render('newRecipe', { user: req.user, message: null });
};

const newRecipe = async (req, res) => {
  const { nameRecipe, ingredients, prepare } = req.body;
  const { idUser, name, lastName } = req.user;
  if (!recipesModel.verifyRecipes(nameRecipe, ingredients, prepare)) {
    return res.status(400).render('newRecipe', { user: req.user, message: 'Preencha os campos' });
  }
  {
    const userName = await `${name} ${lastName}`;
    await recipesModel.createNewRecipes(
      idUser,
      userName,
      nameRecipe,
      ingredients.toString(),
      prepare,
    );
    return res.redirect('/');
  }
};

const myRecipes = async (req, res) => {
  const cooks = await recipesModel.listCook();
  res.render('userRecipe', { cooks, user: req.user });
};

async function editRecipe(req, res) {
  const { id } = req.params;
  const cooks = await listSpecificRecipe(id);
  const ingredients = cooks.ingredients.split(',');
  res.render('edit', { cooks, ingredients, user: req.user, message: null });
}

const saveEditRecipe = async (req, res) => {
  const { id } = req.params;
  const { nameRecipe, listIngredients, textPrepare } = req.body;
  // const cooks = await listSpecificRecipe(id);
  await recipesModel.updateRecipes(id, nameRecipe, listIngredients.toString(), textPrepare);
  res.redirect('/');
};

module.exports = {
  listarReceitas,
  viewRecipesUser,
  searchRecipes,
  recipeRegister,
  newRecipe,
  myRecipes,
  editRecipe,
  saveEditRecipe,
};