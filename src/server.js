import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const port = Number(getEnvVar('PORT', 3000));

export async function setupServer() {
  await initMongoConnection();

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get("/", (req, res) => {
    res.send({ message: "Server is running" });
  });

  app.use('/contacts', contactsRouter);

  app.get('*', notFoundHandler);


  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};


