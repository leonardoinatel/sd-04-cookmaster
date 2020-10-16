const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
  const fetchList = await results.fetchAll();
  const list = await fetchList.map(([id, user, name]) => ({ id, user, name }));

  return list;
};

const getById = async (recipeId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', recipeId)
    .execute();
  const fetchResult = await results.fetchOne();
  const [id, userId, user, name, ingredients, instructions] = fetchResult;
  return {
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  };
};

const getByName = async (recipeName) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :name')
    .bind('name', `%${recipeName}%`)
    .execute();
  const fetchList = await results.fetchAll();
  const list = await fetchList.map(([id, user, name]) => ({ id, user, name }));
  return list;
};

const addNewRecipe = async (id, userName, name, ingredients, instructions) => {
  const db = await connection();
  await db
    .getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, userName, name, ingredients, instructions)
    .execute();
  return true;
};

const getRecipesByUserId = async (userId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name'])
    .where('user_id = :user_id')
    .bind('user_id', userId)
    .execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, userID, user, name]) => ({
    id,
    userID,
    user,
    name,
  }));
};

module.exports = { getAll, getById, getByName, addNewRecipe, getRecipesByUserId };
