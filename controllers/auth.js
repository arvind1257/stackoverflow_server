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

export const getAllUsers = async(req,res) => {
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    }
    catch(err){
        console.log(err+" controllers")
    }
} 

export const updateUser = async(req,res) => {
    const { id:_id } = req.params;
    console.log(_id);
    const { name, about, tags } = req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,'tags':tags}},{new:true})
        res.status(200).json({result:updateUser})
    }
    catch(err){
        console.log(err)
    }
}