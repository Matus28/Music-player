import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { db } from "./database/connection";
import { router as songRoutes } from "./src/routes/songs";
import { router as playlistRoutes } from "./src/routes/playlists";
import { router as libraryRoutes } from "./src/routes/library";
import { router as userRoutes } from "./src/routes/users";
import { updateDatabase } from "./src/utils/service";
import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";

dotenv.config();

// APP creating
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());

app.use(express.json());

// Loging request and method in the terminal
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/users", userRoutes);

// Listens on Port
app.listen(PORT, () => {
  console.log(`[API]: Server is running on http://localhost:${PORT}`);
});

// Updates DB in intervals
const scheduler = new ToadScheduler();

const task = new AsyncTask(
  "updates database",
  () => {
    return updateDatabase().then((result: boolean) => {
      if (!result) throw new Error("Update of Database was not successful!");
      console.log("Task triggered!");
      console.log(result);
    });
  },
  (error: Error) => {
    console.log(error);
  }
);

const job = new SimpleIntervalJob({ seconds: 60, runImmediately: true }, task, {
  id: "id_1",
  preventOverrun: true,
});

scheduler.addSimpleIntervalJob(job);

export default app;
