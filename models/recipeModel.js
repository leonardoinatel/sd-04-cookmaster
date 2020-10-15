const connection = require('./connection');

const receitaById = async (id) => {
  const idData = await connection()
    .then((db) => db.getTable('recipes').select([]).where('id = :id').bind('id', id)
    .execute())
    .then((results) => results.fetchAll());

  const receita = {};
  [
    receita.id,
    receita.user_id,
    receita.user,
    receita.name,
    receita.ingredients,
    receita.instructions,
  ] = idData[0];
  return receita;
};

const receitaByNome = async (nome) => {
  const nomeData = await connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name'])
        .where('name like :nome')
        .bind('nome', `%${nome}%`)
        .execute(),
    )
    .then((resultado) => resultado.fetchAll());
  const receita = nomeData.map(([id, userId, user, name]) => ({ id, userId, user, name }));
  return receita;
};

const cadastrarReceita = async (nomeReceita, preparo, ingredientes, nomeUsuario, idUsuario) => {
  const string = ingredientes.toString();
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(idUsuario, nomeUsuario, nomeReceita, string, preparo)
      .execute(),
  );
};

module.exports = {
  receitaById,
  receitaByNome,
  cadastrarReceita,
};
