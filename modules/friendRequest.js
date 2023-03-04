import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    fromId :{type:String, required:true},
    toId :{type:String, required:true},
    status :{type:String, required:true},
    requestedOn :{type:Date, default:new Date()}
})

export default mongoose.model("friendRequest",requestSchema)