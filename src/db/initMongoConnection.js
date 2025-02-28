import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const DB_URL = process.env.MONGO_URL;

export function initMongoConnection() {
    return mongoose.connect(DB_URL);
}
