import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { apiRouter } from "./routes";
import { errorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api", apiRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "FortiFile-backend"
  });
});

app.use(apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
