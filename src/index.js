import routes, { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import express from 'express';

export const boostrap = async () => {
    const app = express();
    app.use(routes);

    await initMongoConnection();
    setupServer();
};

boostrap();
