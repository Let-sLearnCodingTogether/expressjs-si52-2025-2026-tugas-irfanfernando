import express from "express";
import * as authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const auth = express.Router();
auth.post("/register", authController.register);
auth.post("/login", authController.login);
auth.get("/profile", authMiddleware, authController.profile);

export default auth;