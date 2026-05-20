const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Raízes do Nordeste API',
    version: '1.0.0',
    description: 'MVP Raízes do Nordeste - Sistema de gerenciamento de pedidos',
    contact: {
      name: 'Support',
      email: 'support@raizesdornordeste.com'
    }
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'JWT Authorization header using the Bearer scheme'
    }
  },
  definitions: {
    Pedido: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        canalPedido: { type: 'string', enum: ['TOTEM', 'APP', 'BALCAO', 'PICKUP', 'WEB'], example: 'APP' },
        status: { type: 'string', enum: ['AGUARDANDO_PAGAMENTO', 'COZINHA', 'PRONTO', 'ENTREGUE', 'CANCELADO'], example: 'AGUARDANDO_PAGAMENTO' },
        total: { type: 'number', example: 45.50 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        error: { type: 'string', example: 'BAD_REQUEST' },
        message: { type: 'string', example: 'Mensagem de erro' }
      }
    }
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/server.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  console.log('Swagger documentation generated successfully!');
});
