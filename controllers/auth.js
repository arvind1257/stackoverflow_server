import  Jwt  from "jsonwebtoken"
import bcrypt from "bcryptjs"

import User from "../modules/auth.js"

export const signup = async(req,res) => {
    const {name , email , password } = req.body;
    try{
       const ex = await User.findOne({email});
        if(ex)
        {
            return res.status(200).json({ message:"User Already Exists.",status:"Error" })
        }
        const pass = await bcrypt.hash(password,12)
        const newUser = await User.create({name:name,email: email,password:pass}) 
        const token = Jwt.sign({ email:newUser.email,id:newUser._id},"test",{expiresIn:"1h"})
        res.status(200).json({message:"Thank You, You have successfully registered",status:"Success",result:newUser,token})
    } 
    catch(err){
        console.log(err+" controllers")
    }
}

export const login = async(req,res) => {
    const { email , password } = req.body;
    try{
       const ex = await User.findOne({email});
        if(!ex)
        {
            return res.status(200).json({ message:"User Doesn't Exists.",status:"Error"})
        }
        const isPass = await bcrypt.compare(password,ex.password)
        if(!isPass){
            return res.status(200).json({ message:"Invalid Credentials",status:"Error" })
        }
        const token = Jwt.sign({ email:ex.email,id:ex._id},"test",{expiresIn:"1h"})
        res.status(200).json({result:ex,token})
    }
    catch(err){
        console.log(err+" controllers")
    }
} 