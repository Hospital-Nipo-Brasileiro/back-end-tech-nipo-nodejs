const az_config_dev = {
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
  development, test, az_config_dev
};
