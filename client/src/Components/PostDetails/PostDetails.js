import React from "react";
import { Paper } from "@material-ui/core/";

import useStyles from "./styles";

const Post = () => {
  const classes = useStyles();
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div>Post Details Page</div>
    </Paper>
  );
};

export default Post;
