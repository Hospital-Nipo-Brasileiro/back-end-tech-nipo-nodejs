/* eslint-disable no-unused-vars */
const ErroBase = require("../errors/ErroBase.js");

function manipuladorDeErros(err, req, res, next) {
  if (err instanceof ErroBase){
    err.sendAnswer(res);
  } else {
    new ErroBase().sendAnswer(res);
  }
}
module.exports = manipuladorDeErros;