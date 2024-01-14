# TechNipo - Backend

## Como executar localmente
Para rodar o backend do Technipo localmente, siga as etapas:
Observações: Como o projeto usa SQL server,

1. Clone o repositório
```
git clone https://github.com/Hospital-Nipo-Brasileiro/back-end-tech-nipo-nodejs.git
cd back-end-tech-nipo-nodejs
```

2. Instale as dependencias e de um start na aplicação
```
npm install
npm run dev
```

### Padrão MVC
Utilizamos o padrão MVC em nossa estrutura para uma melhor organização
MVC | Model View Controller

### SRC 
Source | A mãe de todas as pastas

### Config
Pasta de configuração com o banco de dados SQL Server que utiliza com o node a biblioteca de conexão 'mssql'

### Controllers
Pasta onde se encontra todos os controladores. 

### Endpoints

A API expõe os seguintes *endpoints* a partir da *base URL* `localhost:3000`:

`/admissao`
* `POST /admissoes/enviar`
* `POST /admissoes/desk`
* `POST /admissoes/concluir`

`/armario`
* `GET /armarios`
* `GET /armarios/:id`
* `POST /armarios`
* `POST /armarios/:id/restaurar`
* `PUT /armarios/:id`
* `DELETE /armarios/:id`

`/baus`
* `GET /baus`
* `GET /baus/:id`
* `POST /baus`
* `POST /baus/:id/restaurar`
* `PUT /baus/:id`
* `DELETE /baus/:id`

`/cargos`
* `GET /cargos`
* `GET /cargos/:id`
* `POST /cargos`
* `POST /cargos/:id/restaurar`
* `PUT /cargos/:id`
* `DELETE /cargos/:id`

`/cargos-setor`
* `GET /cargos-setor`
* `GET /cargos-setor/:cargoId/cargo`
* `GET /cargos-setor/:setorId/setor`
* `GET /cargos-setor/:id`
* `POST /cargos-setor`
* `POST /cargos-setor/:id/restaurar`
* `PUT /cargos-setor/:id`
* `DELETE /cargos-setor/:id`

`/estoque`
* `GET /estoque`
* `GET /estoque/:id`
* `POST /estoque`
* `POST /estoque/:id/restaurar`
* `PUT /estoque/:id`
* `DELETE /estoque/:id`

`/cargos`
* `GET /cargos`
* `GET /cargos/:id`
* `POST /cargos`
* `POST /cargos/:id/restaurar`
* `PUT /cargos/:id`
* `DELETE /cargos/:id`

`/itens-guardados`
* `GET /itens-guardados`
* `GET /itens-guardados/:id`
* `GET /itens-guardados/:estoqueId/itens`
* `POST /itens-guardados`
* `POST /itens-guardados/:id/restaurar`
* `PUT /itens-guardados/:id`
* `DELETE /itens-guardados/:id`

`/itens`
* `GET /itens`
* `GET /itens/:id`
* `POST /itens`
* `POST /itens/:id/restaurar`
* `PUT /itens/:id`
* `DELETE /itens/:id`

`/logins-papeis`
* `GET /logins-papeis`
* `GET /logins-papeis/:id`
* `POST /logins-papeis`
* `POST /logins-papeis/:id/restaurar`
* `PUT /logins-papeis/:id`
* `DELETE /logins-papeis/:id`

`/login`
* `GET /login`
* `GET /login/:id`
* `GET /rotaProtegida`
* `GET /login/:id/infos`
* `POST /login`
* `POST /login/:id/restaurar`
* `PUT /login/:id`
* `PUT /login/:id/reset`
* `DELETE /login/:id`

`/papeis-permissoes`
* `GET /papeis-permissoes`
* `GET /papeis-permissoes/:id`
* `POST /papeis-permissoes`
* `POST /papeis-permissoes/:id/restaurar`
* `DELETE /papeis-permissoes/:id`

`/papeis`
* `GET /papeis`
* `GET /papeis/:id`
* `GET /papeis/:id/permissoes`
* `POST /papeis`
* `POST /papeis/:id/restaurar`
* `PUT /papeis/:id`
* `DELETE /papeis/:id`

`/permissoes`
* `GET /permissoes`
* `GET /permissoes/:id`
* `POST /permissoes`
* `POST /permissoes/:id/restaurar`
* `PUT /permissoes/:id`
* `DELETE /permissoes/:id`

`/pessoas`
* `GET /pessoas`
* `GET /pessoas/:id`
* `POST /pessoas`
* `POST /pessoas/:id/restaurar`
* `PUT /pessoas/:id`
* `DELETE /pessoas/:id`

`/prateleiras`
* `GET /prateleiras`
* `GET /prateleiras/:id`
* `POST /prateleiras`
* `POST /prateleiras/:id/restaurar`
* `PUT /prateleiras/:id`
* `DELETE /prateleiras/:id`

`/setores`
* `GET /sistemas-pessoas`
* `GET /sistemas-pessoas/:id`
* `POST /sistemas-pessoas`
* `POST /sistemas-pessoas/:id/restaurar`
* `PUT /sistemas-pessoas/:id`
* `DELETE /sistemas-pessoas/:id`

`/sistemas-pessoas`
* `GET /sistemas-pessoas`
* `GET /sistemas-pessoas/filtra`
* `GET /sistemas-pessoas/:id`
* `GET /sistemas-pessoas/:id/filtra`
* `POST /sistemas-pessoas`
* `POST /sistemas-pessoas/:id/restaurar`
* `PUT /sistemas-pessoas/:id`
* `DELETE /sistemas-pessoas/:id`

`/sistemas`
* `GET /sistemas`
* `GET /sistemas/:id`
* `POST /sistemas`
* `POST /sistemas/:id/restaurar`
* `PUT /sistemas/:id`
* `DELETE /sistemas/:id`

`/zonas`
* `GET /zonas`
* `GET /zonas/:id`
* `POST /zonas`
* `POST /zonas/:id/restaurar`
* `PUT /zonas/:id`
* `DELETE /zonas/:id`

### Consulta aos bancos

Este projeto utiliza o SQL Server Express 2019 como gerenciador de banco de dados SQL.