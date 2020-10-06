const { tables, getTableObj } = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => getTableObj(
  tables.users((u) => u.select([]).where('email = :email').bind('email', email).execute()),
  'fetchOne',
);

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => getTableObj(
  tables.users((u) => u.select([]).where('id = :id').bind('id', id).execute()),
  'fetchOne',
);

module.exports = {
  findByEmail,
  findById,
};
