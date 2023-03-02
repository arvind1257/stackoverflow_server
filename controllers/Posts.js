import Posts from "../modules/posts.js"

export const uploadPosts = async(req,res) => {
    const {_id,name,content,file,fileType} = req.body
    console.log({_id,name,content,file,fileType})
    try{
        await Posts.create({userId:_id,userName:name,content:content,file:file,fileType:fileType}) 
        res.status(200).json("Uploaded Successfully")
    } 
    catch(err){
        console.log(err+" controllers")
    }
}

export const getPosts = async(req,res) => {
    try{
        const post = await Posts.find();
        res.status(200).json(post)
    } 
    catch(err){
        console.log(err+" controllers")
    }
}

export const setLikes = async(req,res) => {
    const {_id,type,userId} = req.body
    console.log({_id,type,userId})
    try{
        const post = await Posts.findById(_id);
        console.log(post)
        const likeIndex = post.like.findIndex((id) => id===String(userId))
        const disLikeIndex = post.disLike.findIndex((id) => id===String(userId))
        if(type === 'like'){
            if(disLikeIndex!==-1){
                post.disLike =  post.disLike.filter((id) => id!==String(userId))
            }
            if(likeIndex===-1){
                post.like.push(userId)
            }
            else{
                post.like = post.like.filter((id) => id!== String(userId))
            }
        }
        else if(type === 'disLike'){
            if(likeIndex!==-1){
                post.like =  post.like.filter((id) => id!==String(userId))
            }
            if(disLikeIndex===-1){
                post.disLike.push(userId)
            }
            else{
                post.disLike = post.disLike.filter((id) => id!== String(userId))
            }
        }
        console.log(post)
        await Posts.findByIdAndUpdate( _id, post )
        res.status(200).json("Contructing")
    } 
    catch(err){
        console.log(err+" controllers")
    }
}

export const deletePost = async(req,res) => {
    const {id:_id} = req.params
    try{
        await Posts.findByIdAndRemove(_id)
        res.status(200).json("Deleted Successfully")
    } 
    catch(err){
        console.log(err+" controllers")
    }
}