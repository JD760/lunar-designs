// import necessary libraries to extend the server's functionality
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import apiRouter from "./api";
import {connect} from "mongoose";
// dotenv allows environment variables to be set in a file
// this means secrets such as API keys can be hidden by excluding the 
// file from uploads
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

// connect to mongoDB
connect(process.env.DB_URI ?? "", {dbName: "Lunar-Designs"});

// bypasses CORS restrictions during development
app.use(cors());

// small library for extracting the contents of HTTP requests
app.use(express.json());

// use the public folder as a route - allows images and static data to be accessed
app.use(express.static("public"));

// set up a route for the API to keep the main file tidy
app.use("/api", apiRouter);

// the server is accessed at localhost:PORT/
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});