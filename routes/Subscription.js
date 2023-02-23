import Express from "express";
import { postSubscription,getSubscription } from "../controllers/Subscription.js";
const router = Express.Router();

router.post('/post',postSubscription)
router.post('/get',getSubscription)

export default router;