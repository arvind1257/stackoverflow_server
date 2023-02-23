import Questions from "../modules/Questions.js"
import {updateSubscription} from "./Subscription.js"
import mongoose from "mongoose"

export const AskQuestion = async(req,res) => {
    const postQuestionData = req.body
    const postQuestion = new Questions({...postQuestionData});
    try{
        await postQuestion.save();
        updateSubscription(req,res)
        //res.status(200).json("Posted a question successfully")
    }
    catch(err){
        console.log(err);
    }
}

export const getAllQuestions = async(req,res) => {
    try{
        const questionList = await Questions.find().sort({askedOn:-1})
        res.status(200).json(questionList)
    }
    catch(err){
        console.log(err);
    }
}

export const deleteQuestion = async(req,res) => {
    const { id:_id } = req.params
    try{
        await Questions.findByIdAndRemove( _id )
        res.status(200).json("Deleted successfully")
    }
    catch(err){
        console.log(err);
    }
}

export const voteQuestion = async(req,res) => {
    const {id,vote,userId} = req.body
    try{
        const question = await Questions.findById(id);
        const upIndex = question.upVote.findIndex((id) => id===String(userId))
        const downIndex = question.downVote.findIndex((id) => id===String(userId))

        if(vote === 'upVote'){
            if(downIndex!==-1){
                question.downVote =  question.downVote.filter((id) => id!==String(userId))
            }
            if(upIndex===-1){
                question.upVote.push(userId)
            }
            else{
                question.upVote = question.upVote.filter((id) => id!== String(userId))
            }
        }
        else if(vote === 'downVote'){
            if(upIndex!==-1){
                question.upVote =  question.upVote.filter((id) => id!==String(userId))
            }
            if(downIndex===-1){
                question.downVote.push(userId)
            }
            else{
                question.downVote = question.downVote.filter((id) => id!== String(userId))
            }
        }
        await Questions.findByIdAndUpdate( id, question )
        res.status(200).json("Successfully voted")
    }
    catch(err){
        console.log(err)
    }
}