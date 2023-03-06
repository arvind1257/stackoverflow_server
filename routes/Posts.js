import Express from "express";
import { uploadPosts,getPosts,setLikes,deletePost,uploadMedia } from "../controllers/Posts.js";
const router = Express.Router();
import multer from "multer"
const upload = multer();
router.post('/upload',uploadPosts)
router.post('/media',upload.any(),uploadMedia)
router.get('/get',getPosts)
router.patch('/likes',setLikes)
router.delete('/delete/:id',deletePost)

export default router;