import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import YAML from 'yaml';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = (app) => {
  try {
    const file = fs.readFileSync(SWAGGER_PATH, 'utf8');
    const swaggerDoc = YAML.parse(file);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  } catch (err) {
    console.error("Swagger load error:", err.message);
    app.use('/api-docs', (req, res) => {
      res.status(500).send("Can't load Swagger docs");
    });
  }
};
