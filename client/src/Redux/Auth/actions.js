// import { AUTH } from "./actionTypes";
// import axios from "axios";
// const url = `http://localhost:5000/posts`;
// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//   },
// };
// export const signin = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(url, formData, config);
//     console.log(data);
//     dispatch({ type: AUTH, data });

//     router.push("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signup = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(url, formData, config);
//     console.log(data);

//     dispatch({ type: AUTH, data });

//     router.push("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

import { AUTH } from "./actionTypes";
import axios from "axios";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

// const API = axios.create({ baseURL: "http://localhost:5000" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }

//   return req;
// });

// https://memoories.herokuapp.com
export const signin = (formData, router) => async (dispatch) => {
  return axios
    .post(`http://localhost:5000/posts/user/signin`, formData, config)
    .then((res) => {
      console.log(res.data);

      dispatch({ type: AUTH, payload: res.data });
      //   dispatch(createPostSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      router.push("/");
      //   dispatch(createPostFailure(err));
    });
  //   try {
  //     const { data } = await API.post("/user/signin", formData, config);
  //     console.log(data);
  //     dispatch({ type: AUTH, data });

  //     router.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
};
// axios.post(`http://localhost:5000/user/signup`, formData, {
//     headers: {
//       'Authorization': `Basic ${token}`
//     }
//   })
export const signup = (formData, router) => async (dispatch) => {
  return axios
    .post("http://localhost:5000/posts/user/signup", formData, config)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: AUTH, payload: res.data });
      router.push("/");
      //   dispatch(createPostSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      //   dispatch(createPostFailure(err));
    });
  //   try {
  //     const { data } = await API.post("/user/signup", formData, config);
  //     console.log(data);

  //     dispatch({ type: AUTH, data });

  //     router.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
};
