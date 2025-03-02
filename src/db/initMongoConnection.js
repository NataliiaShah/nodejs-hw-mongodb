import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async () => {
    try {
        const user = getEnvVar('MONGODB_USER');
        const pwd = getEnvVar('MONGODB_PASSWORD');
        //const url = getEnvVar('MONGODB_URL');
        const db = getEnvVar('MONGODB_DB');

        await mongoose.connect(
            `mongodb+srv://${user}:${pwd}@users.y70ir.mongodb.net/${db}?retryWrites=true&w=majority&appName=Users`,
        );
        console.log('Mongo connection successfully established!');
    } catch (error) {
    console.log(error);
    console.log('Internal Server Error');
  }
};


