require("dotenv").config();

const development_home = {
  dialect: "mssql",
  dialectOptions: {
    driver: "ODBC Driver 18 for SQL Server",
    options: {
      encrypt: true,
      trustServerCertificate: false,
      connectionTimeout: 30000,
    },
  },
  host: "srv-technipo.database.windows.net",
  database: "db-technipo-dev",
  username: "dbatn",
  password: "Technipo@2023",
  logging: true,
};

const development = {
  database: "db_technipo_dev",
  username: "DBATN",
  password: "123456",
  dialect: "mssql",
  logging: true
};

module.exports = {
  development, development_home
};
