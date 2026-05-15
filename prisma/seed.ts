import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.pedido.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.usuario.deleteMany();

  const senhaCriptografada = await bcrypt.hash('senha123', 10);

  await prisma.usuario.createMany({
    data: [
      { email: 'cliente@email.com', senha: senhaCriptografada, perfil: 'CLIENTE' },
      { email: 'gerente@email.com', senha: senhaCriptografada, perfil: 'GERENTE' }
    ]
  });

  await prisma.produto.createMany({
    data: [
      { nome: 'Baião de Dois Especial', preco: 35.00 },
      { nome: 'Carne de Sol com Macaxeira', preco: 42.50 },
      { nome: 'Suco de Caju Natural 500ml', preco: 8.00 }
    ]
  });

  console.log('Banco de dados populado com sucesso!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());