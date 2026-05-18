#PROJETO: Desenvolvimento Backend

O projeto foi desenvolvido para o trabalho da disciplina PROJETO: Desenvolvimento Back-end com foco no backend do sistema de pedidos do restaurante Raízes do Nordeste.

O sistema permite criar pedidos no app ifood e no totem, realizar autenticação de usuários e atualizar o status dos pedidos conforme o andamento do pedido, foram adicionadas validações de acesso para rotas administrativas e integração com uma simulação de gateway de pagamento.

Tecnologias utilizadas:
- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- JWT
- BcryptJS
- Swagger (com auto-gen)
Escolhi utilizar SQLite por ser mais simples e leve para rodar localmente e facilitar os testes do MVP.

Estrutura do projeto:
O projeto foi dividido em algumas pastas principais:
- `src/controllers` Controllers das rotas e regras dos pedidos.
- `src/middlewares`Middlewares de autenticação e permissões.
- - `src/infrastructure`Configuração do Prisma Client.
- - `prisma`schema do banco, migrations e seed.

## Como executar
Instalar dependências:
```bash
npm install
```
Executar migrations:
```bash
npx prisma migrate dev
```
Executar seed:
```bash
npx prisma db seed
```
Iniciar projeto:
```bash
npm run dev
```
A aplicação vai iniciar na porta `3000`.

testes:
O postman com os teste está na raiz do projeto
Ela contém cenários de sucesso e alguns testes de validação de autenticação e permissão.
