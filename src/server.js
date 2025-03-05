import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getEnvVar } from './utils/getEnvVar.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import contactsRouter from './routers/contacts.js';
import router from './routers/contacts.js';

const logger = pino();
const app = express();
const port = getEnvVar('PORT');

app.use(cors());

export async function setupServer() {
  try {
    await initMongoConnection();

    app.use((req, res, next) => {
      logger.info(`Request made to ${req.originalUrl}`);
      next();
    });

    app.get("/", (req, res) => {
      res.send({ message: "Server is running" });
    });

    app.use('/contacts' ,contactsRouter);

    app.get('*', (req, res) => {
      res.status(404).json({
        status: 404,
        message: 'Not Found',
      });
    });

    app.use((err, req, res, next) => {
      logger.error(err);
      res.status(500).json({
        status: 500,
        message: 'Something went wrong while fetching the contact',
        error: err.message,
      });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    logger.error('Error starting server:', error);
  }
};

export default router;


