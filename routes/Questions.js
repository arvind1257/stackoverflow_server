import Express from "express";
import { AskQuestion, getAllQuestions } from "../controllers/Questions.js";
const router = Express.Router();

router.post('/Ask',AskQuestion)
router.get('/get',getAllQuestions)

export default router;