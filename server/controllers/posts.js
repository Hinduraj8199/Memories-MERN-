import mongoose from "mongoose";
import PostMessage from "../models/postMessege.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 8;
    const offset = (Number(page) - 1) * limit;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(offset);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(404).json({ messege: err });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log(searchQuery, tags);
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  console.log(req.body);
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(404).json("Error from createPost");
  }
};

export const updatePost = async (req, res) => {
  const post = req.body;
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");
  const updated = await PostMessage.findByIdAndUpdate(
    _id,
    { _id, ...post },
    { new: true }
  ); // or {_id,post,{new:true}} works same
  res.status(200).json(updated);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");
  await PostMessage.findByIdAndRemove(id);
  res.json("Post Deleted Successfully");
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!req.userId) {
    return res.json({ message: "User is Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updated = await PostMessage.findByIdAndUpdate(id, post, { new: true }); // or {_id,post,{new:true}} works same
  console.log(updated);
  res.status(200).json(updated);
};
