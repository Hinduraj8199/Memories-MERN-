// import axios from "axios";
// import {
//   FETCH_DATA_REQUEST,
//   FETCH_DATA_SUCCESS,
//   FETCH_DATA_FAILURE,
//   CREATE_POST_REQUEST,
//   CREATE_POST_SUCCESS,
//   CREATE_POST_FAILURE,
//   UPDATE_POST,
//   DELETE_POST,
//   LIKE_POST,
// } from "./actionTypes";

// export const fetchPostRequest = () => {
//   return {
//     type: FETCH_DATA_REQUEST,
//   };
// };

// export const fetchPostSuccess = (data) => {
//   return {
//     type: FETCH_DATA_SUCCESS,
//     payload: data,
//   };
// };

// export const fetchPostFailure = (err) => {
//   return {
//     type: FETCH_DATA_FAILURE,
//     payload: err,
//   };
// };

// export const createPostRequest = () => {
//   return {
//     type: CREATE_POST_REQUEST,
//   };
// };

// export const createPostSuccess = (data) => {
//   return {
//     type: CREATE_POST_SUCCESS,
//     payload: data,
//   };
// };

// export const createPostFailure = (err) => {
//   return {
//     type: CREATE_POST_FAILURE,
//     payload: err,
//   };
// };
// //functions
// const url = `http://localhost:5000/posts`;
// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//   },
// };
// export const fetchposts = () => (dispatch) => {
//   dispatch(fetchPostRequest());
//   return axios
//     .get(url)
//     .then((res) => {
//       console.log(res);
//       dispatch(fetchPostSuccess(res.data));
//     })
//     .catch((err) => {
//       dispatch(fetchPostFailure(err));
//       console.log(err);
//     });
// };

// export const createPost = (post) => (dispatch) => {
//   dispatch(createPostRequest());
//   console.log(post);
//   return axios
//     .post(url, post, config)
//     .then((res) => {
//       console.log(res.data);
//       dispatch(createPostSuccess(res.data));
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch(createPostFailure(err));
//     });
// };

// export const updatePost = (id, post) => (dispatch) => {
//   console.log(id, post, config);
//   return axios
//     .patch(`http://localhost:5000/posts/${id}`, post, config)
//     .then((res) => {
//       console.log(res.data);
//       dispatch({ type: UPDATE_POST, payload: res.data });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const deletePost = (id) => (dispatch) => {
//   return axios
//     .delete(`http://localhost:5000/posts/${id}`)
//     .then(() => dispatch({ type: DELETE_POST, payload: id }))
//     .catch((err) => console.log(err));
// };

// export const likePost = (id) => (dispatch) => {
//   // console.log(id)
//   return axios
//     .patch(`http://localhost:5000/posts/${id}/likePost`)
//     .then((res) => {
//       dispatch({ type: LIKE_POST, payload: res.data });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

import axios from "axios";
import {
  FETCH_DATA_REQUEST,
  FETCH_BY_SEARCH,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  FETCH_POST,
} from "./actionTypes";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

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
    type: CREATE_POST_REQUEST,
  };
};

export const createPostSuccess = (data) => {
  return {
    type: CREATE_POST_SUCCESS,
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
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const fetchpost = (id) => (dispatch) => {
  dispatch(fetchPostRequest());
  return API.get(`/posts/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(dispatch({ type: FETCH_POST, payload: res.data }));
    })
    .catch((err) => {
      dispatch(fetchPostFailure(err));
      console.log(err);
    });
};

export const fetchposts = (page) => (dispatch) => {
  dispatch(fetchPostRequest());
  return API.get(`/posts?page=${page}`)
    .then((res) => {
      console.log(res);
      dispatch(fetchPostSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchPostFailure(err));
      console.log(err);
    });
};

export const fetchpostsBySearch = (searchQuery) => (dispatch) => {
  dispatch(fetchPostRequest());
  console.log(searchQuery);
  return API.get(
    `posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  )
    .then((res) => {
      console.log(res);
      dispatch({ type: FETCH_BY_SEARCH, payload: res.data.data });
    })
    .catch((err) => {
      dispatch(fetchPostFailure(err));
      console.log(err);
    });
};

export const createPost = (post) => (dispatch) => {
  dispatch(createPostRequest());
  console.log(post);
  return API.post("/posts", post, config)
    .then((res) => {
      console.log(res.data);
      dispatch(createPostSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(createPostFailure(err));
    });
};

export const updatePost = (id, post) => (dispatch) => {
  console.log(id, post, config);
  return API.patch(`/posts/${id}`, post, config)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: UPDATE_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePost = (id) => (dispatch) => {
  return API.delete(`/posts/${id}`)
    .then(() => dispatch({ type: DELETE_POST, payload: id }))
    .catch((err) => console.log(err));
};

export const likePost = (id) => (dispatch) => {
  // console.log(id)
  return API.patch(`/posts/${id}/likePost`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: LIKE_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
