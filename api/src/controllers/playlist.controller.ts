import { Request, Response } from "express";
import {
  assignFavoriteSongService,
  assignSongService,
  createPlaylistService,
  getAllPlaylistsService,
  getAssignedSongsService,
  removeFavoriteSongService,
  removePlaylistService,
  removeSongService,
  updatePlaylistService,
} from "../services/playlist.service";

export const playlistController = {
  async getPlaylists(req: Request, res: Response) {
    const userId = req.user?.userId ?? -1;
    try {
      const result = await getAllPlaylistsService(userId);
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
    }
  },

  async createPlaylist(req: Request, res: Response) {
    const userId = req.user?.userId ?? -1;
    const { playlistName } = req.body;
    try {
      const result = await createPlaylistService(userId, playlistName);
      if (result && result[0].affectedRows === 1) {
        res.status(200).json({ message: "Playlist successfully created!" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },

  async updatePlaylist(req: Request, res: Response) {
    const playlistId = req.params.id;
    const userId = req.user?.userId ?? -1;
    const { playlistName } = req.body;
    try {
      const result = await updatePlaylistService(
        userId,
        parseInt(playlistId ?? ""),
        playlistName
      );
      if (result && result[0].affectedRows === 1) {
        res.status(200).json({ message: "Playlist successfully updated!" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },

  async removePlaylist(req: Request, res: Response) {
    const playlistId = req.params.id;
    const userId = req.user?.userId ?? -1;
    try {
      const result = await removePlaylistService(
        userId,
        parseInt(playlistId ?? "")
      );
      if (result && result[0].affectedRows === 1) {
        res.status(200).json({ message: "Playlist was successfully removed!" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },

  async getAssignedSongs(req: Request, res: Response) {
    const userId = req.user?.userId ?? -1;
    const playlistId = parseInt(req.params.id ?? "-1");

    try {
      const result = await getAssignedSongsService(userId, playlistId);
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
    }
  },

  async assignFavoriteSong(req: Request, res: Response) {
    const userId = req.user?.userId ?? -1;
    const { songId } = req.body;

    try {
      const result = await assignFavoriteSongService(userId, songId);
      if (result && result[0].affectedRows === 1) {
        res
          .status(201)
          .json({ message: "Song successfully assign to playlist!" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },

  async assignSong(req: Request, res: Response) {
    const playlistId = req.params.id;
    const userId = req.user?.userId ?? -1;
    const { songId } = req.body;
    try {
      const result = await assignSongService(
        userId,
        parseInt(playlistId ?? ""),
        songId
      );
      if (result && result[0].affectedRows === 1) {
        res
          .status(201)
          .json({ message: "Song successfully assign to playlist!" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },

  async removeSong(req: Request, res: Response) {
    const playlistId = req.params.id;
    const userId = req.user?.userId ?? -1;
    const { songId } = req.body;
    try {
      const result = await removeSongService(
        userId,
        parseInt(playlistId ?? ""),
        songId
      );
      if (result && result[0].affectedRows === 1) {
        res
          .status(200)
          .json({ message: "Song successfully remove from playlist!" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },

  async removeFavoriteSong(req: Request, res: Response) {
    const userId = req.user?.userId ?? -1;
    const { songId } = req.body;
    console.log("wuwuwuwuwuwuwwuwuwuwuwuwwwuwuwuwwuwuw");
    try {
      const result = await removeFavoriteSongService(userId, songId);
      if (result && result[0].affectedRows === 1) {
        res
          .status(200)
          .json({ message: "Song successfully remove from playlist!" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: "EeEeEeEeEeEeE" });
      }
    }
  },
};
