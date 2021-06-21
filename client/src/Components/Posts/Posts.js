import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles"
import { shallowEqual, useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  const [posts,isLoading] = useSelector((state)=>[state.posts.posts,state.posts.isLoading],shallowEqual);
  // console.log(posts,isLoading)
  return (
    isLoading? <CircularProgress />:(
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post)=>(
          <Grid item key={post._id} xs={12} sm={6} >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
