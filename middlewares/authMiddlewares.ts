import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ChaveSuperSecretaDoProjetoMultidisciplinar2026';

export interface CustomRequest extends Request {
  usuarioLogado?: { id: number; perfil: string };
}

export function autenticarJWT(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Token de acesso ausente ou invalido." });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; perfil: string };
    req.usuarioLogado = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "UNAUTHORIZED", message: "Token expirado ou corrompido." });
  }
}

export function verificarPerfilGerente(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.usuarioLogado || req.usuarioLogado.perfil !== 'GERENTE') {
    return res.status(403).json({ error: "FORBIDDEN", message: "Acesso restrito para administradores." });
  }
  next();
}