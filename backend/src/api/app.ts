import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  AuthRouter,
  CollectionsRouter,
  NotesRouter,
  TagsRouter,
  UsersRouter,
  JournalsRouter,
} from "./routes";
import { config, db } from "./core";
import swaggerUi from "swagger-ui-express";

const app = express();
const configuration = { db: db };
export const port = config.port || 3000;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Use controllers
app.use("/auth", AuthRouter);
app.use("/collections", CollectionsRouter);
app.use("/notes", NotesRouter);
app.use("/journals", JournalsRouter);
app.use("/me", UsersRouter);
app.use("/tags", TagsRouter);

// Swagger Documentation
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "./swagger.json",
    },
  }),
);

export default app;
