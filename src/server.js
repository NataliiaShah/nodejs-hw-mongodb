import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pino from "pino";

dotenv.config();
const logger = pino();
const app = express();
const port = process.env.PORT;
app.use(cors());

export function setupServer() {
    app.use((req, res, next) => {
    logger.info(`Request made to ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.send({ message: "Server is running" });
});

app.use((req, res) => {
    res.status(404).send({
        message: 'Not found',
    });
});

    app.listen(port, () => {
        logger.info(`Server is running on port ${port}`);
    });

};
