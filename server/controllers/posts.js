import PostMessage from "../models/postMessege.js";

export const getPost = async(req,res)=>{
    try{
        const posts = await PostMessage.find();
        res.status(200).json(posts);

    } catch(err){
        res.status(404).json({messege:err.message})
    }
};

export const createPost = async(req,res)=>{
    const post = req.body;
    const newPost =  new PostMessage(post);
    try{
         await newPost.save();
        res.status(200).json(newPost);

    } catch(err){
        res.status(404).json({messege:err.message})
    }
};