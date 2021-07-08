import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { fetchposts } from "../../Redux/Posts/actions";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchposts);
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid container alignItems="stretch" justify="center" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
