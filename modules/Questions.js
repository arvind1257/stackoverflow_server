import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    questionTitle: {type:String,required:"Question must have a title"},
    questionBody: {type:String,required:"Question must have a body"},
    questionTags: {type:[String],required:"Question must have a tags"},
    noOfAnswers: {type:Number,default:0},
    upVote: {type:[String],default:[]},
    downVote: {type:[String],default:[]},
    userPosted: {type:String,required:"Question must have an author"},
    userId: {type:String,required:"UserID must be entered"},
    askedOn: {type:Date,default:new Date()},
    answer: [{
        answerBody:{type:String},
        userAnswered:{type:String},
        userId:{type:String},
        answeredOn:{type:Date,default:new Date()},
    }]
})

export default mongoose.model("Question",QuestionSchema)