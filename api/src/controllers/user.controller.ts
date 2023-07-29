import { Request, Response } from "express";
import { loginUserService, signupUserService } from "../services/user.service";

export const userController = {
  async signupUser(req: Request, res: Response) {
    try {
      await signupUserService(req.body);
      res.status(201).json({ message: "User successfully created!" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(422).json({ message: error.message });
      }
    }
  },

  async loginUser(req: Request, res: Response) {
    try {
      const { email, token } = await loginUserService(req.body);
      res.status(200).json({ email, token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },
};
