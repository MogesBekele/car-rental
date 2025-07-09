import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";

//initialize express
const app = express();

//database connection
connectDB();
//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRouter);
app.use('/api/owner', ownerRouter )

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
