import { Response } from 'express';
import { CustomRequest } from '../middlewares/authMiddleware';
import { prisma } from '../infrastructure/database';

const CANAIS_PERMITIDOS = ["TOTEM", "APP", "BALCAO", "PICKUP", "WEB"];
const STATUS_PERMITIDOS = ["AGUARDANDO_PAGAMENTO", "COZINHA", "PRONTO", "ENTREGUE", "CANCELADO"];

export async function criarPedido(req: CustomRequest, res: Response) {
  const { canalPedido, total } = req.body;

  if (!canalPedido || !CANAIS_PERMITIDOS.includes(canalPedido)) {
    return res.status(400).json({ 
      error: "BAD_REQUEST", 
      message: "Canal de pedido invalido. Escolha entre: TOTEM, APP, BALCAO, PICKUP, WEB." 
    });
  }

  if (!total || total <= 0) {
    return res.status(400).json({ error: "BAD_REQUEST", message: "O valor total deve ser maior que zero." });
  }

  const novoPedido = await prisma.pedido.create({
    data: {
      canalPedido,
      total: parseFloat(total),
      status: "AGUARDANDO_PAGAMENTO"
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

  if (!status || !STATUS_PERMITIDOS.includes(status)) {
    return res.status(400).json({ error: "BAD_REQUEST", message: "Status informado invalido." });
  }

  const pedido = await prisma.pedido.findUnique({ where: { id: Number(id) } });
  if (!pedido) {
    return res.status(404).json({ error: "NOT_FOUND", message: "Pedido nao encontrado." });
  }

  const pedidoAtualizado = await prisma.pedido.update({
    where: { id: Number(id) },
    data: { status }
  });

  return res.status(200).json(pedidoAtualizado);
}

export async function listarPedidos(req: CustomRequest, res: Response) {
  const { canalPedido } = req.query;

  const filtros: any = {};
  if (canalPedido && CANAIS_PERMITIDOS.includes(String(canalPedido))) {
    filtros.canalPedido = String(canalPedido);
  }

  const pedidos = await prisma.pedido.findMany({ where: filtros });
  return res.status(200).json(pedidos);
}