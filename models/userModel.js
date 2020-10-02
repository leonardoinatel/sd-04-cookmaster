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
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .select(['id', 'email'])
      .where('email = :email')
      .bind('email', email)
      .execute()
      .then((results) => results.fetchAll()[0])
      .then((user) => user.map((firstName) => firstName)),
  );
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return connection().then((db) =>
    db
      .getTable('users')
      .select(['id', 'first_name'])
      .where('id = :id')
      .bind('id', id)
      .execute()
      .then((results) => results.fetchAll()[0])
      .then((user) => user.map((firstName) => firstName)),
  );
};

const isEmailValid = (email) => {
  const reg = '[A-Z0-9]{1,}@[A-Z0-9]{2,}.[A-Z0-9]{2,}';
  return reg.test(email);
};

const isPasswordValid = (password) => password.length >= 6;

const isCounterPasswordValid = (counterPassword, password) => counterPassword === password;

const isUserNameValid = (name) => typeof name === 'string' && name.length >= 3;

const isUserLastNameValid = (lastName) => typeof lastName === 'string' && lastName.length >= 3;

module.exports = {
  findByEmail,
  findById,
  isUserNameValid,
  isUserLastNameValid,
  isPasswordValid,
  isCounterPasswordValid,
  isEmailValid,
};
