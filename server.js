const dotenv = require('dotenv/config')
const express = require('express')
const app = require("./src/app.js")

const port = 3000

app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
});