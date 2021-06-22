import express from "express";
import { getPosts,createPost,updatePost,deletePost,likePost } from "../controllers/posts.js";

//in backend always give file extensions while importing files like .js etc
const router = express.Router();

router.get("/",getPosts);

router.post("/",createPost)

router.patch("/:id",updatePost)

router.delete("/:id",deletePost);

router.patch("/:id/likePost",likePost)

export default router