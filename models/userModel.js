/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };
const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} userMail Email do usuário a ser encontrado
 */
const findByEmail = async (userMail) => {
  // return TEMP_USER;
  return connection()
  .then((db) =>
    db
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('email = :userMail_param')
      .bind('userMail_param', userMail)
      .execute(),
  )
  .then((results) => results.fetchOne())
  .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} userId ID do usuário
 */
const findById = async (userId) => {
  // return TEMP_USER;
  return connection()
  .then((db) =>
    db
      .getTable('users')
      .select(['id', 'email', 'password', 'first_name', 'last_name'])
      .where('id = :userId_param')
      .bind('userId_param', userId)
      .execute(),
  )
  .then((results) => results.fetchOne())
  .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
};

module.exports = {
  findByEmail,
  findById,
};
