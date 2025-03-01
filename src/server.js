import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pino from "pino";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { getAllContacts, getContactById } from "./services/contacts.js";

dotenv.config();
const logger = pino();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

async function setupServer() {
    try {
        await initMongoConnection();

        app.use((req, res, next) => {
            logger.info(`Request made to ${req.originalUrl}`);
            next();
        });

        app.get("/", (req, res) => {
            res.send({ message: "Server is running" });
        });

        app.get('/contacts', async (req, res) => {
            const contacts = await getAllContacts();
            res.status(200).json({
                status: 200,
                message: 'Successfully found contacts',
                data: contacts,
            });
        });

        app.get('/contacts/:contactId', async (req, res) => {
            try {
                const { contactId } = req.params;
                console.log('Received contactId:', contactId);

                const contact = await getContactById(contactId);

                if (contact === null) {
                    return res.status(404).json({
                        status: 404,
                        message: 'Contact not found',
                    });
                }

                res.status(200).json({
                    status: 200,
                    message: `Successfully found contact with id ${contactId}`,
                    data: contact,
                });
            } catch (error) {
                logger.error(error);
                res.status(500).json({
                    status: 500,
                    message: 'Something went wrong while fetching the contact',
                    error: error.message,
                });
            }
        });

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
                message: 'Something went wrong',
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

export default setupServer;
