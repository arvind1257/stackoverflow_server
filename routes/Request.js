import Express from "express";
import { requestSend,requestGet,requestDelete,requestAccept } from "../controllers/Request.js";
const router = Express.Router();

router.post('/send',requestSend)
router.get('/get/:id',requestGet)
router.delete('/delete/:id',requestDelete)
router.patch('/accept',requestAccept)
export default router;