import Posts from "../modules/posts.js"
import path from "path"
import { Stream } from "stream"
import { google } from "googleapis"

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
 
const KEYFILEPATH = path.join(process.cwd(), "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});


export const uploadMedia = async(req,res) => {
    try {
        const { files } = req;
        const id = await uploadFile(files);
        res.status(200).send(id);
      } catch (f) {
        res.send(f.message);
      }
}

const uploadFile = async (fileObject) => {
    const bufferStream = new Stream.PassThrough();
    bufferStream.end(fileObject[0].buffer);
    console.log(fileObject[0])
    const { data } = await google.drive({ version: "v3", auth }).files.create({
      media: {
        mimeType: fileObject[0].mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject[0].originalname,
        mimeType:fileObject[0].mimeType,
        parents: ["1lx8cBOi3Dpoub4vmVxPJSs5uKs6uciT7"],
      },
      fields: "name,id",
    });
    console.log(data)
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return data.id
  };

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