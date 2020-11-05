const connect = require('./connection');

const getRecipes = async () => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, user, nameRecipe]) => ({
    id,
    user,
    nameRecipe,
  })));

const getRecipesById = async (recipeId) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', recipeId)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }))[0]);

const filterRecipe = async (filterParam) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name', 'ingredients', 'instructions'])
    .where('name LIKE :filterParam')
    .bind('filterParam', `%${filterParam}%`)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, user, name, ingredients, instructions]) => ({
    id,
    user,
    name,
    ingredients,
    instructions,
  }))[0]);

const filterRecipesByUser = async (userId) => connect()
  .then((db) => db
    .getTable('recipes')
    .select(['user_id', 'user', 'name'])
    .where('user_id = :user_id')
    .bind('user_id', userId)
    .execute())
  .then((result) => result.fetchAll())
  .then((rows) => rows.map(([id, user, name]) => ({
    id,
    user,
    name,
  })));

module.exports = {
  getRecipes,
  getRecipesById,
  filterRecipe,
  filterRecipesByUser,
};
