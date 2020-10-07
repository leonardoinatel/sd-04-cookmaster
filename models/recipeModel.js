const connection = require('./connection');

const getAllRecipes = async () =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .select(['id', 'user', 'name', 'ingredients', 'instructions'])
      .execute()
      .then((results) => results.fetchAll())
      .then((results) =>
        results.map(([id, user, name, ingredients, instructions]) => ({
          id,
          user,
          name,
          ingredients,
          instructions,
        })),
      )
      .catch((err) => {
        throw err;
      }),
  );

const getRecipeById = async (id) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .select(['id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', id)
      .execute()
      .then((results) => results.fetchOne())
      .then((recipes) => recipes.map((name) => name))
      .catch((err) => {
        throw err;
      }),
  );

// const isValidCreatedRecipe = (id, user, name, ingredients, instructions) => {
//   return id && user && name && ingredients && instructions;
// };

const createRecipe = async (id, user, name, ingredients, instructions) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .insert(['id', 'user', 'name', 'ingredients', 'instructions'])
        .values(id, user, name, ingredients, instructions)
        .execute(),
    )
    .catch((err) => {
      throw err;
    });

module.exports = { getAllRecipes, getRecipeById, createRecipe };
