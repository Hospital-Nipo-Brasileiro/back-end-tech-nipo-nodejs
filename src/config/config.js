require("dotenv").config();

const development = {
  database: "db_technipo_dev",
  username: "DBATN",
  password: "dbatn@2023",
  dialect: "mssql",
  logging: true
};

const homologation = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT || "mssql",
  logging: true
};

const developmentAzure = {
  database: process.env.AZ_DB,
  username: process.env.AZ_DB_USERNAME,
  password: process.env.AZ_DB_PASSWORD,
  host: process.env.AZ_DB_HOST,
  dialect: process.env.AZ_DB_DIALECT || "mssql",
  dialectOptions: {
    options: {
      "encrypt": true,
      "trustServerCertificate": false
    }
  },
  logging: true
};

module.exports = {
  development, developmentAzure, homologation
};
