# Raízes do Nordeste - MVP Backend

## Sobre o Projeto

Projeto desenvolvido para a disciplina PROJETO: Desenvolvimento Back-end, com foco na criação de uma API para gerenciamento de pedidos do restaurante Raízes do Nordeste.

O sistema permite autenticação de usuários, criação de pedidos multicanal, atualização de status dos pedidos e integração com um gateway de pagamento mock para simulação de pagamentos aprovados e recusados.

O projeto foi desenvolvido considerando o fluxo principal do MVP da aplicação.

---

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- JWT
- BcryptJS
- Swagger/OpenAPI
- Postman

O SQLite foi utilizado por ser uma solução simples e leve para execução local do MVP e realização dos testes da aplicação.

---

## Funcionalidades

- Autenticação JWT
- Controle de acesso por perfil
- Criação de pedidos
- Registro de pedidos multicanal
- Atualização de status dos pedidos
- Simulação de pagamento mock
- Documentação Swagger/OpenAPI

---

## Estrutura do Projeto

```text
src/
 ├── controllers/
 ├── middlewares/
 ├── infrastructure/

prisma/
 ├── schema.prisma
 ├── migrations/
