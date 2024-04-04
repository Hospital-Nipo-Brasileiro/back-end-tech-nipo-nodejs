<<<<<<< HEAD
require("dotenv").config();

const development = {
  database: "db_technipo_dev",
  username: "DBATN",
  password: "dbatn@2023",
  dialect: "mssql",
  logging: true
};

const production = {
  database: "db_technipo_prd",
  username: "DBATN",
  password: "dbatn@2023",
  dialect: "mssql",
  logging: true
};

module.exports = {
  development, production
};
=======
const test = {
  database: "db_technipo_test",
  username: "DBATN",
  password: "123456",
  dialect: "mssql",
  logging: true
};

const development = {
  database: "db_technipo_dev",
  username: "DBATN",
  password: "123456",
  dialect: "mssql",
  logging: true
};

module.exports = {
  development, test
};
>>>>>>> develop
