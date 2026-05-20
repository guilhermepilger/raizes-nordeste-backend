import express from 'express';
import * as dotenv from 'dotenv';
import { listarPedidos, criarPedido, atualizarStatusPedido, processarPagamentoMock, meusPedidos } from './controllers/pedidoController';
import { autenticarJWT, verificarPerfilGerente } from './middlewares/authMiddlewares';
import { login, cadastrarCliente } from './controllers/authController';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
app.use(express.json());
setupSwagger(app);

//#region ROTAS PUBLICAS
app.post('/auth/cadastrarCliente', cadastrarCliente);
app.post('/auth/login', login);
//#endregion

//#region Pedidos (autenticado)
app.get('/pedidos', autenticarJWT, verificarPerfilGerente, listarPedidos);
app.get('/meus-pedidos', autenticarJWT, meusPedidos);
app.post('/pedidos', autenticarJWT, criarPedido);
app.patch('/pedidos/:id', autenticarJWT, atualizarStatusPedido);
//#endregion

//#region Mock de Pagamento (autenticado)
app.post('/pagamento/mock', autenticarJWT, processarPagamentoMock);
//#endregion


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
