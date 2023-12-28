/* eslint-disable no-unused-vars */
const app = require("./src/app.js");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor escutando em http://localhost:${PORT}`);
});