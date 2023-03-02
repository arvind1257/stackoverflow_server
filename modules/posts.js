import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
    userId :{type:String, required:true},
    userName :{type:String, required:true},
    file:{type:String, required:true},
    fileType:{type:String,required:true},
    content:{type:String},
    like:{type:[String],default:[]},
    disLike:{type:[String],default:[]},
    postedOn:{type:Date, default:new Date()}
})

export default mongoose.model("posts",postsSchema)