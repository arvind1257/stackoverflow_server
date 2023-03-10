import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name :{type:String, required:true},
    email :{type:String, required:true},
    password :{type:String, required:true},
    about :{type:String},
    tags :{type:[String]},
    type :{type:String, default:"FREE"},
    paymentReceipt :{
        receipt:{type:String},
        month:{type:Date},
    },
    Questions:{
        noOfPost:{type:Number,default:1},
        postDate:{type:Date,default:new Date()},
    },
    friends:[{
        userId:{type:String}
    }],
    otp:{type:String},
    joinedOn :{type:Date, default:new Date()}
})

export default mongoose.model("User",userSchema)