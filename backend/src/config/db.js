import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB_URL, {
            tls: true,
            serverSelectionTimeoutMS: 10000,
        });

        console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error("💥 MONGODB connection error:");
        console.error(error);
        process.exit(1);
    }
};