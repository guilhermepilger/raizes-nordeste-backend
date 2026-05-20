import { Response } from 'express';
import { CustomRequest } from '../middlewares/authMiddlewares';
import { prisma } from '../infrastructure/database';

export enum CanalPedido {
  TOTEM = "TOTEM",
  APP = "APP",
  BALCAO = "BALCAO",
  PICKUP = "PICKUP",
  WEB = "WEB"
}

enum StatusPedido {
  AGUARDANDO_PAGAMENTO = "AGUARDANDO_PAGAMENTO",
  COZINHA = "COZINHA",
  PRONTO = "PRONTO",
  ENTREGUE = "ENTREGUE",
  CANCELADO = "CANCELADO"
}

export async function criarPedido(req: CustomRequest, res: Response) {
  const { canalPedido, produtoIds } = req.body;
  const canalPedidoUpper = String(canalPedido).toUpperCase();

  if (!canalPedido || !Object.values(CanalPedido).includes(canalPedidoUpper as CanalPedido)) {
    return res.status(400).json({ 
      error: "BAD_REQUEST", 
      message: "Canal de pedido invalido. Escolha entre: TOTEM, APP, BALCAO, PICKUP, WEB." 
    });
  }

  if (!produtoIds || !Array.isArray(produtoIds) || produtoIds.length === 0) {
    return res.status(400).json({ error: "BAD_REQUEST", message: "Um array de produtoIds é obrigatório." });
  }

  const produtos = await prisma.produto.findMany({
    where: { id: { in: produtoIds } }
  });

  if (produtos.length !== produtoIds.length) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Um ou mais produtos não encontrados.", produtoIds });
  }

  const total = produtos.reduce((soma, produto) => soma + produto.preco, 0);

  const novoPedido = await prisma.pedido.create({
    data: {
      usuarioId: req.usuarioLogado!.id,
      canalPedido: canalPedidoUpper,
      total,
      status: StatusPedido.AGUARDANDO_PAGAMENTO,
      pedidoProdutos: {
        create: produtoIds.map(produtoId => ({
          produtoId
        }))
      }
    },
    include: {
      pedidoProdutos: {
        include: {
          produto: true
        }
      }
    }
  });

  return res.status(201).json(novoPedido);
}

export async function processarPagamentoMock(req: CustomRequest, res: Response) {
  const { pedidoId, statusPagamento } = req.body;

  if (!pedidoId || !statusPagamento) {
    return res.status(400).json({ error: "BAD_REQUEST", message: "Campos pedidoId e statusPagamento sao obrigatorios." });
  }

  const pedido = await prisma.pedido.findUnique({ where: { id: Number(pedidoId) } });
  if (!pedido) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Pedido nao encontrado." });
  }

  let novoStatus = "CANCELADO";
  if (statusPagamento === "APROVADO") {
    novoStatus = "COZINHA";
  }

  const pedidoAtualizado = await prisma.pedido.update({
    where: { id: Number(pedidoId) },
    data: { status: novoStatus }
  });

  return res.status(200).json({
    mensagem: statusPagamento === "APROVADO" ? "Pagamento processado com sucesso!" : "Pagamento recusado.",
    pedido: pedidoAtualizado
  });
}

export async function atualizarStatusPedido(req: CustomRequest, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  const statusUpper = String(status).toUpperCase();
  if (!status || !Object.values(StatusPedido).includes(statusUpper as StatusPedido)) {
    return res.status(400).json({ error: "BAD_REQUEST", message: "Status informado invalido." });
  }

  const pedido = await prisma.pedido.findUnique({ where: { id: Number(id) } });
  if (!pedido) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Pedido nao encontrado." });
  }

  const pedidoAtualizado = await prisma.pedido.update({
    where: { id: Number(id) },
    data: { status: statusUpper as StatusPedido }
  });

  return res.status(200).json(pedidoAtualizado);
}

export async function listarPedidos(req: CustomRequest, res: Response) {
  const { canalPedido } = req.query;

  if(!canalPedido)
  {
    return res.status(400).json({ error: "BAD_REQUEST", message: "O canal de pedido é obrigatório para listar os pedidos." });
  }

  const canalPedidoUpper = String(canalPedido).toUpperCase();
  if (!Object.values(CanalPedido).includes(canalPedidoUpper as CanalPedido)) 
  {
    return res.status(400).json({ 
      error: "BAD_REQUEST", 
      message: "Canal de pedido invalido. Escolha entre: TOTEM, APP, BALCAO, PICKUP, WEB." 
    });
  }

  const filtros: any = { canalPedido: canalPedidoUpper as CanalPedido };
  const pedidos = await prisma.pedido.findMany({ where: filtros });
  return res.status(200).json({pedidos});
}

export async function meusPedidos(req: CustomRequest, res: Response) {
  const usuarioId = req.usuarioLogado!.id;

  const pedidos = await prisma.pedido.findMany({
    where: { usuarioId },
    include: {
      pedidoProdutos: {
        include: {
          produto: true
        }
      }
    }
  });

  return res.status(200).json({ pedidos });
}