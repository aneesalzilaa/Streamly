import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import connectdb from "./lib/db.js";
import cookieParser from "cookie-parser"; 
import userRoute from './routes/userRouter.js';
import chatRoute from "./routes/chatRoute.js";
import cors from "cors"; // ✅ استدعاء CORS

dotenv.config();
connectdb();

const app = express();

// Middleware

// ✅ إعداد CORS للسماح بالطلبات من Frontend
app.use(cors({
  origin: "http://localhost:5173", // رابط الfrontend (Vite)
  credentials: true,               // للسماح بالكوكيز
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/chat", chatRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
