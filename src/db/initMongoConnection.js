import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const DB_URI = process.env.MONGO_URI;

export function initMongoConnection() {
    return mongoose.connect(DB_URI);
}
