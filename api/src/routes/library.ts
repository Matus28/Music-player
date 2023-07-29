import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { libraryController } from "../controllers/library.controller";

export const router = express.Router();

router.use(requireAuth);

router.get("/", libraryController.getLibrary);
