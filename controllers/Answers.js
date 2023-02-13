import Questions from "../modules/Questions.js"
import mongoose from "mongoose"

export const postAnswer = async(req,res) => {
    const {id:_id} = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
    updateNoOfQuestions(_id,noOfAnswers)
    try{
        const updateQuestion = await Questions.findByIdAndUpdate( _id,{$addToSet : {"answer": [{answerBody, userAnswered, userId}]}})
        res.status(200).json(updateQuestion)
    }
    catch(err){
        console.log(err);
    }
}

export const deleteAnswer = async(req,res) => {
    const { id:_id,noOfAnswers,answerId } = req.body;
    updateNoOfQuestions(_id,noOfAnswers)
    try{
        await Questions.updateOne({_id},{$pull : {"answer": {_id:answerId}}})
        res.status(200).json("Successfully deleted");
    }
    catch(err){
        console.log(err);
    }
}

const updateNoOfQuestions = async(_id,noOfAnswers) => {
    try{
        await Questions.findByIdAndUpdate( _id,{ $set : {'noOfAnswers' : noOfAnswers}})
    }
    catch(err){
        console.log(err)
    }
}
