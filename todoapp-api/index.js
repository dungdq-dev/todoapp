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
import { swaggerConfig } from "./config/swaggerConfig.js";

// create app
const app = express();

// configure head information
app.use(cors());
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use public folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;

// connect to db
dbConnect();

// configuration for swagger docs
swaggerConfig(app);

// logger middleware
app.use(logger);

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
