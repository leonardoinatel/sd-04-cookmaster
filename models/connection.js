const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};
// conexão com o banco de dados
const connect = () => mysqlx.getSession(config).then((session) => session.getSchema('cookmaster'));
// retorna a table especificada do banco de dados
const getTable = (name) => connect().then((schema) => schema.getTable(name));
// retorna um array com os nomes das colunas
const getColumns = (table = []) => table.getColumns().map((column) => column.name);
// transforma o resultado da query padrão do mysqlx em um objeto
// com os atributos nomeados pelas colunas da table
const arrayToObj = (arr = [], columns) => arr.reduce(
  (acc, curr, i) => ({ ...acc, [columns[i]]: curr }), {},
);
// transforma um array de arrays da query mysqlx em um array de objetos
const arrayOfObjects = (arr, columns) => arr.map((item) => arrayToObj(item, columns));
// realiza a query e o fetch One/All
// retorna o resultado em formato de objeto
const getTableObj = async (tableName, query, method) => {
  const queryResult = await getTable(tableName).then(query);
  const columns = getColumns(queryResult);
  const all = {
    fetchOne: (t) => arrayToObj(t.fetchOne(), columns),
    fetchAll: (t) => arrayOfObjects(t.fetchAll(), columns),
  };

  return all[method](queryResult);
};
// poderia ter utilizado um simples deconstruct no array e montado o objeto,
// porém prefiro não deixar coisas hard coded,
// por mais que seria mais viável nesse projeto com apenas 2 tabelas,
// esse código é totalmente flexível e se adapta a qualquer tabela
module.exports = {
  tables: {
    recipes: (query, method) => getTableObj('recipes', query, method),
    users: (query, method) => getTableObj('users', query, method),
  },
};
