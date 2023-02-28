import User from "../modules/auth.js"

export const postSubscription = async(req,res) => {
    const {_id,type,receipt,noOfQuestions} = req.body;
    try{
        const Users = await User.findByIdAndUpdate(_id,{$set : {'type':type,'Questions':{'noOfPost':noOfQuestions,'postDate':new Date()},'paymentReceipt':{'receipt':receipt,'month':new Date()}}},{new:true})
        res.status(200).json({result:Users})
    }
    catch(err){
        console.log(err)
    }
}

export const updateSubscription = async(req,res) => {
    const { userId:_id } = req.body
    try{
        const ex = await User.findById(_id);
        if(ex.type!='Gold')
        await User.findByIdAndUpdate(_id,{$set:{'Questions':{'noOfPost':ex.Questions.noOfPost-1,'postDate':new Date()}}},{new:true})
        else
        await User.findByIdAndUpdate(_id,{$set:{'Questions':{'noOfPost':-1,'postDate':new Date()}}},{new:true})
        res.status(200).json(ex)
    }
    catch(err){
        console.log(err)
    }
}

export const getSubscription = async(req,res) => {
    
}