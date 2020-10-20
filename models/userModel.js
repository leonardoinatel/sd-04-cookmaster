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

// /**
//  * Busca um usuário através do seu email e, se encontrado, retorna-o.
//  * @param {string} email Email do usuário a ser encontrado
//  */

const findByEmail = async (email) => {
  connection()
    .then((db) =>
      db
        .getTable('users')
        .select([])
        .where('email = :email')
        .bind('email', email)
        .execute()
        .then((results) => results.fetchAll()[0])
        .then(([id, emailFind, password, firstName, lastName]) => ({
          id,
          emailFind,
          password,
          firstName,
          lastName,
        })),
    )
    .catch((err) => {
      throw err;
    });
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select([])
        .where('id = :id')
        .bind('id', id)
        .execute()
        .then((results) => results.fetchAll()[0])
        .then(([idUser, email, password, firstName, lastName]) => ({
          idUser,
          email,
          password,
          firstName,
          lastName,
        })),
    )
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  findByEmail,
  findById,
};
