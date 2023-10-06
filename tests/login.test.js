const { describe, before, after, it } = require("node:test");
const { deepStrictEqual, ok } = require("node:assert");

const BASE_URL = "http://localhost:8080";

describe("Deve ser passado todas as validações de login", () => {

  let _server = {};
  before(async () => {
    _server = (await require("../server.js")).app;
    await new Promise(resolve => _server.once("listening", resolve));
  });

  after(done => _server.close(done));

  it("Deve barrar a passagem de uma criação de usuário", async () => {
    const data = {
      ds_username: "Gustavofonseca",
      ds_password: "123"
    };

    const request = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    deepStrictEqual(request.status, 200);
    const response = await request.json();
    ok(response.token, "token should be present");

  });
});