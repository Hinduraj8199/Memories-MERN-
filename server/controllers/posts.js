import PostMessage from "../models/postMessege.js";

export const getPosts = async(req,res)=>{
    try{
        const posts = await PostMessage.find();
        res.status(200).json(posts);

    } catch(err){
        res.status(404).json({messege:err.message})
    }
};

export const createPost = async(req,res)=>{
    console.log(req.body)
    const { title, message, selectedFile, creator, tags } = req.body;
    const newPost = new PostMessage({ title, message, selectedFile, creator, tags });

    try{
         await newPost.save();
        res.status(200).json(newPost);

    } catch(err){
        res.status(404).json("Error from createPost")
    }
};