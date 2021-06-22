import  mongoose from "mongoose";
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

export const updatePost = async (req,res)=>{
    const post = req.body;
    const {id:_id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id");
   const updated = await PostMessage.findByIdAndUpdate(_id,{_id,...post},{new:true}); // or {_id,post,{new:true}} works same
     res.status(200).json(updated);

};

export const deletePost =async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that id");
    await PostMessage.findByIdAndRemove(id);
     res.json("Post Deleted Successfully");
};


export const likePost = async (req,res)=>{
    const {id} = req.params;
    console.log(id) 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that id");
   const post = await PostMessage.findById(id);
    const updated = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true}); // or {_id,post,{new:true}} works same
    console.log(updated) 
    res.status(200).json(updated);

};