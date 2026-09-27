import express from "express";
import path from "path";
import { clerkMiddleware } from '@clerk/express';
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(clerkMiddleware());//menambahkan object authentication di bawah the requet => req.auth
const __dirname = path.resolve();

app.get("/api/health", (req,res) => {res.status(200).json({message:"Success"});});

// Membuat app siap untuk deployment

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../admin/dist")));

    app.get("/{*any}",(req,res) => {
        res.sendFile(path.join(__dirname, "../admin" , "dist" , "index.html"));
    });
}
app.listen(ENV.PORT, () => {
    console.log(`Server is up and running on port ${ENV.PORT}`)
    connectDB();
});