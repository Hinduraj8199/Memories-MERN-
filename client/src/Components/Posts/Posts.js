import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles"
import { shallowEqual, useSelector } from "react-redux";

const Posts = () => {
  const classes = useStyles();
  const [posts,isLoading] = useSelector((state)=>[state.posts.posts,state.posts.isLoading],shallowEqual);
  // console.log(posts,isLoading)
  return (
    <div>
      <h1>Posts</h1>
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
