import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

//in backend always give file extensions while importing files like .js etc
const router = express.Router();
// write getPost route for single post fetching based on :id
router.get("/search", getPostsBySearch);

router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.patch("/:id/likePost", auth, likePost);

export default router;
