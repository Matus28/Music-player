import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { db } from "../database/connection";
import { user } from "../schema/user";
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";

dotenv.config();

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { userId } = jwt.verify(
      token ?? "",
      process.env.SECRET as jwt.Secret
    ) as jwt.JwtPayload;

    const result = await db
      .select({ userId: user.userId })
      .from(user)
      .where(eq(user.userId, userId));
    req.user = result[0];
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ message: "Request is not authorized!" });
    }
  }
};
