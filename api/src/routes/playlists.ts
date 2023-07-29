import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { playlistController } from "../controllers/playlist.controller";

export const router = express.Router();

router.use(requireAuth);

router.get("/", playlistController.getPlaylists);

router.post("/", playlistController.createPlaylist);

router.put("/:id", playlistController.updatePlaylist);

router.delete("/:id", playlistController.removePlaylist);

router.post("/favorite", playlistController.assignFavoriteSong);

router.get("/:id/songs", playlistController.getAssignedSongs);

router.post("/:id/songs", playlistController.assignSong);

router.delete("/:id/songs", playlistController.removeSong);
