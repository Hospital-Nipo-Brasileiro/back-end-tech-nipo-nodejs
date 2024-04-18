const jwt = require("jsonwebtoken");
const AcessoNaoAutorizado = require("../errors/AcessoNaoAutorizado");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, "seuSegredoToken", (err, decoded) => {
    if (err) {
      next(new AcessoNaoAutorizado("Token inválido"));
    }

    req.userId = decoded.userId; 
    next();
  });
}

function extractUserId(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, "seuSegredoToken", (err, decoded) => {
    if (err) {
      return next(new AcessoNaoAutorizado("Token inválido"));
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken, extractUserId;
