import Questions from "../modules/Questions.js"
import mongoose from "mongoose"

export const AskQuestion = async(req,res) => {
    const postQuestionData = req.body
    const postQuestion = new Questions({...postQuestionData,userId: req.userId});
    try{
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
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
