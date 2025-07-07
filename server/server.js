import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db";

//initialize express
const app = express();

//database connection
connectDB();
//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});