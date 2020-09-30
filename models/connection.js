require('dotenv').config();
const mysqlx = require('@mysql/xdevapi');

console.log(process.env.MYSQL_USER);

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  // socketPath: '/var/run/mysqld/mysqld.sock',
};

const connection = () =>
  mysqlx
    .getSession(config)
    .then((session) => {
      return session.getSchema('cookmaster');
    })
    .catch((err) => {
      // console.error(err);
      process.exit(1);
    });

module.exports = connection;
