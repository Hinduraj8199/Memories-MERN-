import React,{useEffect} from "react";
import {Container,AppBar,Typography,Grow,Grid} from "@material-ui/core"
import memories from "./Images/memories.png"
import Posts from "./Components/Posts/Posts.js"
import Form from "./Components/Form/Form.js"
import useStyles from "./styles"
import {useDispatch} from "react-redux";
import { fetchposts } from "./Redux/Posts/actions";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchposts());
  },[])
  return (
    <Container maxwidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit" >
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>

      <Grow in>
        <Container>
          <Grid container alignItems="stretch" justify="center" spacing={3} >
            <Grid item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid  item xs={12} sm={4}>
              <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
