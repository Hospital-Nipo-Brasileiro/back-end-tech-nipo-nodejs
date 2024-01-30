/* eslint-disable no-unused-vars */
const app = require("./src/app.js");

const BASE_URL = process.env.BASE_URL || "http://localhost";
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor escutando em ${BASE_URL}:${PORT}`);
});

module.exports = { BASE_URL, PORT };