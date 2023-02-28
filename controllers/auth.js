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
        var ex = await User.findOne({email});
        if(!ex)
        {
            return res.status(200).json({ message:"User Doesn't Exists.",status:"Error"})
        }
        const isPass = await bcrypt.compare(password,ex.password)
        if(!isPass){
            return res.status(200).json({ message:"Invalid Credentials",status:"Error" })
        }
        let questions=1;
        if(ex.type=="Silver") questions=5;
        else if(ex.type=='Gold') questions=-1; 


        let date1= new Date(ex.paymentReceipt.month)
        let date2= new Date()
       
        if(checkDate(date1,date2,30)){
            ex = await User.findByIdAndUpdate(ex._id,{$set :{'Questions':{'noOfPost':1,'postDate':new Date()},'paymentReceipt':null,'type':"FREE"}},{new:true})
        }
        else{
            date1= new Date(ex.Questions.postDate)
            if(checkDate(date1,date2,1)){
                ex = await User.findByIdAndUpdate(ex._id,{$set :{'Questions':{'noOfPost':questions,'postDate':new Date()}}},{new:true})
            }
        }
        const token = Jwt.sign({ email:ex.email,id:ex._id},"test",{expiresIn:"1h"})
        res.status(200).json({result:ex._id,token})
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
    const { name, about, tags } = req.body;
    try{
        await User.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,'tags':tags}},{new:true})
        res.status(200)
    }
    catch(err){
        console.log(err)
    }
}

export const getUser = async(req,res) => {
    const {id:_id} = req.params;
    try{
        const ex = await User.findById(_id);
        res.status(200).json(ex)
    }
    catch(err){
        console.log(err)
    }
}



const checkDate = (date1,date2,no) =>{
    date1.setHours(0)
    date1.setMilliseconds(0)
    date1.setSeconds(0)
    date1.setMinutes(0)
    date2.setHours(0)
    date2.setMilliseconds(0)
    date2.setSeconds(0)
    date2.setMinutes(0)
    if((date2.getTime()-date1.getTime())/(1000*60*60*24)>=no) return true;
    else return false;
}