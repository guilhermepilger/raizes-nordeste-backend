import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export const setupSwagger = (app: Express) => {
  try {
    const swaggerFile = path.join(__dirname, '../swagger_output.json');
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));

    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument, { swaggerOptions: { persistAuthorization: true } }));
    console.log('Swagger documentation available at http://localhost:3000/api-docs');
  } catch (error) {
    console.warn('Swagger documentation could not be loaded. Please run: npm run swagger-generate');
  }
};
