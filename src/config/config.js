require("dotenv").config();

const development = {
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

const x = {
  database: "db_technipo_dev",
  username: "DBATN",
  password: "dbatn@2023",
  dialect: "mysql",
  logging: true
};

module.exports = {
  development, x
};
