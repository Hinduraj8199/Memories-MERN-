import express from "express";
import { getPosts } from "../controllers/posts.js";
import { createPost } from "../controllers/posts.js";
//in backend always give file extensions while importing files like .js etc
const router = express.Router();

router.get("/",getPosts);

router.post("/",createPost)

export default router