import { Request, Response } from "express";
import { getAllSongsService } from "../services/song.service";

export const songController = {
  async getSongs(req: Request, res: Response) {
    try {
      const result = await getAllSongsService();
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
    }
  },
};
