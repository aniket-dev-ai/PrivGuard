import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnection from "./config/DataBase.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./Route/UserRoutes.js";
import VaultRoutes from "./Route/VaultRoutes.js";
import actionRoutes from "./Route/ActionRoute.js";
const app = express();
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

await dbConnection();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev")); 
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  })
);

app.use("/api/user", userRoutes);
app.use("/api/action", actionRoutes);
app.use("/api/vault", VaultRoutes);

export default app;
