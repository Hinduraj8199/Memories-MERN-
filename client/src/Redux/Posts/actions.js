import axios from "axios";
import {
  FETCH_DATA_REQUEST ,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from "./actionTypes";



export const fetchPostRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const fetchPostSuccess = (data) => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchPostFailure = (err) => {
  return {
    type: FETCH_USER_DATA_FAILURE,
    payload: err,
  };
};

//functions
const url = "http://localhost:500/posts"
export const fetchposts = () => (dispatch) => {
  dispatch(fetchPostRequest());
  return axios
    .get(url)
    .then((res) => {
      console.log(res);
      dispatch(fetchPostSuccess());
    })
    .catch((err) => {
      dispatch(fetchPostFailure(err));
      console.log(err);
    });
};

export const fetchUser = (params) => (dispatch) => {
  dispatch(fetchUserRequest());
  console.log(params.username, params.token);
  return axios
    .get(`https://masai-api-mocker.herokuapp.com/user/${params.username}`, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    })
    .then((res) => {
      dispatch(fetchUserSuccess(res.data));
      console.log(res);
    })
    .catch((err) => {
      dispatch(fetchUserFailure(err));
      console.log(err);
    });
};
