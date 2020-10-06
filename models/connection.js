const mysqlx = require('@mysql/xdevapi');
let schema; /* Aqui entra a variável que salva à conexão, começa como undefined */
const connection = () => {
  return schema /* Se schema já existir: */
    ? Promise.resolve(schema) /* Retorna o schema numa Promise: */
    : mysqlx
        .getSession({
          /* Se não, criamos uma nova conexão */ user: 'root',
          password: '292311',
          host: 'localhost',
          port: 33060,
          schema: 'cookmaster',
        })
        .then((session) => {
          /* Quando terminamos de abrir a conexão: */
          schema = session.getSchema('cookmaster'); /* Armazenamos a conexão na variável `schema`*/
          return schema; /* E retornamos o schema de dentro da Promise */
        })
        .catch((err) => {
          /* Caso um erro ocorra: */
          console.error(err); /* Exibimos o erro no console */
          process.exit(1); /* E encerramos o processo */
        });
};
module.exports = connection;
