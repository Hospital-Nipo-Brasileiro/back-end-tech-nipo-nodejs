require("dotenv").config();


const x = {
  database: "db_technipo_dev",
  username: "DBATN",
  password: "dbatn@2023",
  dialect: "mssql",
  logging: true
};

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
  username: "DBATN",
  password: "dbatn@2023", 
  logging: true,
};

const production = {
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
  username: "DBATN",
  password: "dbatn@2023", 
  logging: true,
};

module.exports = {
  development,
};


module.exports = {
  development, x, production
};
