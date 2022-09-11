import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import items from "./items.json";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/api/stockinfo", (req, res) => {
    res.json(items);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});