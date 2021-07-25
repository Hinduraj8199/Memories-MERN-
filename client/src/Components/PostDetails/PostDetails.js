import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import useStyles from "./styles";
import { fetchpost, fetchpostsBySearch } from "../../Redux/Posts/actions";
import axios from "axios";

const Post = () => {
  const { id } = useParams();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  console.log(post, isLoading);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(posts);
  useEffect(() => {
    dispatch(fetchpost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(
        fetchpostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [dispatch, post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const openPost = (_id) => history.push(`/posts/${_id}`);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          {/* <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography> */}
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      <br />
      <div>
        <br />
        <br />
        {recommendedPosts.length > 0 && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">
              You might also like:
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({ title, name, message, likes, selectedFile, _id }) => (
                  <div
                    style={{
                      margin: "20px",
                      cursor: "pointer",
                      // minWidth: "30%",
                      // maxWidth: "30%",

                      // justifyContent: "center",
                    }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h5">
                      {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {name.toUpperCase()}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img
                      src={selectedFile}
                      width="200px"
                      height="150px"
                      alt={title}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
};

export default Post;
