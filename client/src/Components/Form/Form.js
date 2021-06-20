import React from "react";
import useStyles from "./styles"
import { TextField,Button,Typography,Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../Redux/Posts/actions";

const initState = {
  creator:"",
  title:"",
  message:"",
  tags:"",
  selectedFile:""
}
const Form = () => {
  const [postData,setPostData] = React.useState(initState);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(postData)
    dispatch(createPost(postData));
    setPostData(initState);
  }
  const clear = ()=>{

  }
 
  return (
   <Paper className={classes.paper} >
     <form autoComplete="off" noValidate onSubmit={handleSubmit} className={`${classes.root} ${classes.form}`}>
        <Typography variant="h6">Craeting a Memory</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
        </form>
   </Paper>
  );
};

export default Form;
