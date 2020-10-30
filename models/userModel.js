const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
// Abaixo está uma implementação do método `findByEmail`
const findByEmail = (emailParam) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', emailParam)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({ id, email, password, name, lastName }));
};
/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */

const findById = async (id) => {
  // implementar o método findById usando o método findByEmail como referência
};

module.exports = {
  findByEmail,
  findById,
};
