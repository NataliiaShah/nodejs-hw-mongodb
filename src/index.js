import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

export const boostrap = async () => {
    await initMongoConnection();
    setupServer();
};

boostrap();
