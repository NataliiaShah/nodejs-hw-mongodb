import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getEnvVar } from './utils/getEnvVar.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import contactsRouter from './routers/contacts.js';  // Потрібно використовувати тільки це

const logger = pino();
const app = express();
const port = getEnvVar('PORT');

// Підключення CORS
app.use(cors());

// Підключення middleware для логування
app.use((req, res, next) => {
    logger.info(`Request made to ${req.originalUrl}`);
    next();
});

// Головний маршрут
app.get("/", (req, res) => {
    res.send({ message: "Server is running" });
});

// Підключення маршрутів для контактів
app.use('/contacts', contactsRouter);

// Обробка 404 помилки
app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found',
    });
});

// Обробка помилок
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({
        status: 500,
        message: 'Something went wrong while fetching the contact',
        error: err.message,
    });
});

// Підключення до MongoDB та запуск сервера
export async function setupServer() {
    try {
        await initMongoConnection();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        logger.error('Error starting server:', error);
    }
}




