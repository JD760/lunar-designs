// import necessary libraries to extend the server's functionality
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import items from "./items.json";

// dotenv allows environment variables to be set in a file
// this means secrets such as API keys can be hidden by excluding the 
// file from uploads
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

// bypasses CORS restrictions during development
app.use(cors());

// use the public folder as a route - allows images and static data to be accessed
app.use(express.static("public"));

// the stockinfo route sends a JSON representation of the items in stock
app.get("/api/stockinfo", (req, res) => {
    res.json(items);
});

// the server is accessed at localhost:PORT/
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});