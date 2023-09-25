import express from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { playlistController } from "../controllers/playlist.controller";

export const router = express.Router();

router.use(requireAuth);

router.get("/", playlistController.getPlaylists);

router.post("/", playlistController.createPlaylist);

router.put("/:id", playlistController.updatePlaylist);

router.get("/:id/songs", playlistController.getAssignedSongs);

router.post("/favorite", playlistController.assignFavoriteSong);

router.post("/:id/songs", playlistController.assignSong);

router.delete("/:id/songs", playlistController.removeSong);

router.delete("/favorite", playlistController.removeFavoriteSong);

router.delete("/:id", playlistController.removePlaylist);
