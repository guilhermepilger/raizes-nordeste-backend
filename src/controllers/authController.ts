import { Request, Response } from 'express';
import { prisma } from '../infrastructure/database';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ChaveSuperSecretaDoProjetoMultidisciplinar2026';

export async function cadastrarCliente(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "BAD_REQUEST", message: "E-mail e senha sao obrigatorios." });
  }

  const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
  if (usuarioExistente) {
    return res.status(400).json({ error: "BAD_REQUEST", message: "E-mail ja cadastrado." });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      email,
      senha: senhaCriptografada,
      perfil: 'CLIENTE'
    }
  });

  const token = jwt.sign(
    { id: usuario.id, perfil: usuario.perfil },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  return res.status(201).json(
    { token, perfil: usuario.perfil, message: "Cliente registrado com sucesso.", senhaCriptografada }
  );
}

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "BAD_REQUEST", message: "E-mail e senha sao obrigatorios." });
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Credenciais invalidas." });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Credenciais invalidas." });
  }

  const token = jwt.sign(
    { id: usuario.id, perfil: usuario.perfil },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  return res.status(200).json(token);
}