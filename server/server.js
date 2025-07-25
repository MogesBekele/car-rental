import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

//initialize express
const app = express();

//database connection
connectDB();
//middleware


const whitelist = [
  "http://localhost:5173",             // local dev frontend URL (Vite default)
  "https://car-rentall.onrender.com",  // your production frontend URL
];

// Dynamically set origin based on request origin
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      // allow REST tools like Postman or server-to-server requests without origin
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      // origin is allowed
      callback(null, true);
    } else {
      // origin is not allowed
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());

//routes
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
