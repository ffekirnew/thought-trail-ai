import config from './core/app.config';
import db from './core/db.config';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import AuthRouter from './routes/auth.route';
import bodyParser from 'body-parser';

const app = express();
const configuration = { db: db };
export const port = config.port || 3000;

app.use(bodyParser.json());

// Use controllers
app.use('/auth', AuthRouter);

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ThoughtTrail API Documentation',
      version: '1.0.0',
      description: 'Documentation for the ThoughtTrial API endpoints',
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ['./routes/*.ts'], 
};

const specs = swaggerJsdoc(options);

// Serve Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

export default app;

