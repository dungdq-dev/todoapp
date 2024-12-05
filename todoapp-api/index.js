import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import { dbConnect } from "./config/dbConfig.js";
import "dotenv/config";

// create server
const server = express();

// configure head information
server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// use public folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
server.use(express.static(path.join(__dirname, "public")));

// connect to db
dbConnect();

// logger middleware
server.use(logger);

// routes
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/tasks", taskRouter);

// error handler
server.use(notFound);
server.use(errorHandler);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
