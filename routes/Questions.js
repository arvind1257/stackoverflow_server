import Express from "express";
import { AskQuestion, getAllQuestions, deleteQuestion, voteQuestion } from "../controllers/Questions.js";

const router = Express.Router();

router.post('/Ask',AskQuestion)
router.get('/get',getAllQuestions)
router.delete('/delete/:id',deleteQuestion)
router.patch('/vote',voteQuestion)

export default router;