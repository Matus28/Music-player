import express from "express";
import { userController } from "../controllers/user.controller";

export const router = express.Router();

router.post("/signup", userController.signupUser);

router.post("/login", userController.loginUser);
