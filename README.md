# Raízes do Nordeste - MVP Backend

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone LINK_DO_REPOSITORIO
```

---

### 2. Instalar as dependências

```bash
npm install
```

---

### 3. Criar arquivo .env

Criar um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="segredo"
```

---

### 4. Executar as migrations do Prisma

```bash
npx prisma migrate dev
```

---

### 5. Executar a seed do banco

```bash
npx prisma db seed
```

---

### 6. Iniciar a aplicação

```bash
npm run dev
```

A aplicação será iniciada na porta:

```text
http://localhost:3000
```

---

### 7. Acessar documentação Swagger/OpenAPI

```text
http://localhost:3000/api-docs
```

---

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
```

---

## Testes

A coleção Postman utilizada nos testes encontra-se disponível na raiz do projeto.

Ela contém cenários de:
- autenticação
- criação de pedidos
- validação de permissões
- pagamento mock
- testes de erro 401, 403 e 404

---

## Autor

Guilherme Pilger

Projeto acadêmico desenvolvido para disciplina PROJETO: Desenvolvimento Back-end.
