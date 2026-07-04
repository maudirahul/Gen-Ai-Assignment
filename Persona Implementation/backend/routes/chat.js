import express from "express";
import { handleChat } from "../controllers/chatController.js";
import { validateChatRequest } from "../middlewares/validator.js";

const router = express.Router();

router.post("/", validateChatRequest, handleChat);

export default router;
