class ErroBase extends Error {
  constructor(mensagem = "Erro interno de Servidor", status = 500) {
    super();
    this.message = mensagem;
    this.status = status;
  }

  sendAnswer(res) {
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status,
    });
  }
}

module.exports = ErroBase;