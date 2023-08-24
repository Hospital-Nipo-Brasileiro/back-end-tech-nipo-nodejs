const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]; // Você pode passar o token no cabeçalho da requisição

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, "seuSegredoToken", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido." });
    }

    req.userId = decoded.userId; // Adicione o ID do usuário autenticado ao objeto de requisição
    next(); // Continue com a próxima função de middleware ou rota
  });
}

module.exports = verifyToken;
