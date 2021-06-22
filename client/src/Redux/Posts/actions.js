import axios from "axios";
import {
  FETCH_DATA_REQUEST ,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CREATE_POST_REQUEST ,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST
} from "./actionTypes";



export const fetchPostRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const fetchPostSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchPostFailure = (err) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: err,
  };
};

export const createPostRequest = () => {
  return {
    type:   CREATE_POST_REQUEST ,
    
  };
};

export const createPostSuccess = (data) => {
  return {
    type:   CREATE_POST_SUCCESS ,
    payload: data,
  };
};

export const createPostFailure = (err) => {
  return {
    type: CREATE_POST_FAILURE,
    payload: err,
  };
};
//functions
const url = `http://localhost:5000/posts`;
export const fetchposts = () => (dispatch) => {
  dispatch(fetchPostRequest());
  return axios
    .get(url)
    .then((res) => {
      console.log(res);
      dispatch(fetchPostSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchPostFailure(err));
      console.log(err);
    });
};

export const createPost = (post) => (dispatch) => {
  dispatch(createPostRequest());
  console.log(post)
  return axios
    .post(url,post)
    .then((res) => {
      console.log(res.data);
      dispatch(createPostSuccess(res.data));
    })
    .catch((err) => {
      dispatch(createPostFailure(err));
      console.log(err);
    });
};


export const updatePost = (id,post) => (dispatch) => {
  console.log(id,post)
  return axios
    .patch(`http://localhost:5000/posts/${id}`,post)
    .then((res) => {
      console.log(res.data);
      dispatch({type:UPDATE_POST,payload:res.data});
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePost = (id) => (dispatch) => {
  return axios.delete(`http://localhost:5000/posts/${id}`)
    .then(()=>dispatch({type:DELETE_POST,payload:id}))
    .catch((err)=>console.log(err));
};


export const likePost = (id) => (dispatch) => {
  // console.log(id)
  return axios
    .patch(`http://localhost:5000/posts/${id}/likePost`)
    .then((res) => {
      dispatch({type:LIKE_POST,payload:res.data});
    })
    .catch((err) => {
      console.log(err);
    });
};