import express from "express";
import { songController } from "../controllers/song.controller";
import { requireAuth } from "../middlewares/requireAuth";

export const router = express.Router();

router.use(requireAuth);

router.get("/", songController.getSongs);
