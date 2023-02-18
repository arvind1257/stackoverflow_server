import Express from "express";
import { ChatbotAnswer } from "../controllers/Chatbot.js";

const router = Express.Router();

router.post('/answer',ChatbotAnswer)

export default router;