const database = require("../../models");
const { describe, it, expect } = require("@jest/globals");

describe("Workflow de modelo de Logins", () => {
  const objetoLogin = {
    ds_username: "teste",
    ds_email: "teste@example.com",
    ds_password: "123"
  };

  it("Deve criar um login com sucesso", async () => {
    const novoLogin = await database.TN_T_LOGIN.create(objetoLogin);

    expect(novoLogin).toBeDefined();
    expect(novoLogin.id).toBeDefined();
    expect(novoLogin.ds_username).toEqual(objetoLogin.ds_username);
    expect(novoLogin.ds_email).toEqual(objetoLogin.ds_email);
  });
});
