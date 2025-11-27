import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CBA WAS API',
      version: '1.0.0',
      description: 'API documentation for CBA WAS',
    },
    servers: [
      {
        url: 'http://localhost:8000', // Adjust port as needed, default seems to be in env but I'll put a placeholder
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/dtos/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default specs;
