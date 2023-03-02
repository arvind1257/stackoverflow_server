import Express from "express";
import { uploadPosts,getPosts,setLikes,deletePost } from "../controllers/Posts.js";
const router = Express.Router();

router.post('/upload',uploadPosts)
router.get('/get',getPosts)
router.patch('/likes',setLikes)
router.delete('/delete/:id',deletePost)

export default router;