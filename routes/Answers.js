import Express from "express";
import { postAnswer, deleteAnswer } from "../controllers/Answers.js";
const router = Express.Router();

router.patch('/post/:id',postAnswer)
router.patch('/delete',deleteAnswer)
export default router;