import Posts from "../modules/posts.js"
import multer from "multer"
import path from "path"

export const uploadPosts = async(req,res) => {
    const {_id,name,content,file,fileType} = req.body
    try{
        await Posts.create({userId:_id,userName:name,content:content,file:file,fileType:fileType}) 
        res.status(200).json("Uploaded Successfully")
    } 
    catch(err){
        console.log(err)
    }
}

export const getPosts = async(req,res) => {
    try{
        const post = await Posts.find();
        res.status(200).json(post)
    } 
    catch(err){
        console.log(err)
    }
}

const storage = multer.diskStorage({
    destination: path.join(process.cwd(), '../client/src/assests', 'posts'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

export const uploadMedia = async(req,res) => {
    try{
        let upload = multer({ storage: storage}).single('avatar');
        upload(req, res, function(err) {
            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            else
            return res.status(200).json(req.file.filename)
        })
        
    } 
    catch(err){
        console.log(err)
    }
}

export const setLikes = async(req,res) => {
    const {_id,type,userId} = req.body
    try{
        const post = await Posts.findById(_id);
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
        await Posts.findByIdAndUpdate( _id, post )
        res.status(200).json("Contructing")
    } 
    catch(err){
        console.log(err)
    }
}

export const deletePost = async(req,res) => {
    const {id:_id} = req.params
    try{
        await Posts.findByIdAndRemove(_id)
        res.status(200).json("Deleted Successfully")
    } 
    catch(err){
        console.log(err)
    }
}