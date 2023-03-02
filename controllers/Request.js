import friendRequest from "../modules/friendRequest.js"
import User from "../modules/auth.js"

export const requestSend = async(req,res) => {
    const {fromId,toId,status} = req.body
    try{
        await friendRequest.create({fromId:fromId,toId:toId,status:status}) 
        res.status(200).json("Sent Request Successfully")
    }
    catch(err){
        console.log(err);
    }
}

export const requestGet = async(req,res) => {
    const {id:_id} = req.params
    try{
        const requests = await friendRequest.find({$or:[{fromId:_id},{toId:_id}]}) 
        res.status(200).json(requests)

    }
    catch(err){
        console.log(err);
    }
}

export const requestDelete = async(req,res) => {
    const {id:_id} = req.params
    try{
        await friendRequest.findByIdAndRemove( _id )
        res.status(200).json("Deleted successfully")
    }
    catch(err){
        console.log(err);
    }
}

export const requestAccept = async(req,res) => {
    const {_id:id,fromId,toId} = req.body
    try{
        var _id = id
        await friendRequest.findByIdAndRemove( _id )
        _id = fromId
        await User.findByIdAndUpdate(_id,{$addToSet:{"friends":[{"userId":toId}]}})
        _id = toId
        await User.findByIdAndUpdate(_id,{$addToSet:{"friends":[{"userId":fromId}]}})
        res.status(200).json("Added successfully")
    }
    catch(err){
        console.log(err);
    }
}

export const requestRemove = async(req,res) => {
    const {fromId,toId} = req.body
    try{
        await User.updateOne({_id:fromId},{$pull:{"friends":{"userId":toId}}})
        await User.updateOne({_id:toId},{$pull:{"friends":{"userId":fromId}}})
        res.status(200).json("Removed successfully")
    }
    catch(err){
        console.log(err);
    }
}