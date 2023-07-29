import { Request, Response } from "express";
import { getLibraryService } from "../services/library.service";

export const libraryController = {
  async getLibrary(req: Request, res: Response) {
    const userId = req.user?.userId ?? -1;
    try {
      const result = await getLibraryService(userId);
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
    }
  },
};
