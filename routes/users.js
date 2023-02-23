import Express from "express";
import {login, signup, getUser, getAllUsers, updateUser} from "../controllers/auth.js"
const router = Express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/getUser/:id',getUser)
router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id',updateUser)
export default router;