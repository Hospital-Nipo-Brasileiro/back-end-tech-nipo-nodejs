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
