import {
  FETCH_DATA_REQUEST ,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST
} from "./actionTypes";

const init = {
  isLoading: false,
  isError: false,
  posts:[]
};

export const postReducer = (state = init, { type, payload }) => {
  switch (type) {

    case FETCH_DATA_REQUEST: {
      return {
        ...state,
        isLoading:true
       
      };
    }

    case FETCH_DATA_SUCCESS: {
      return {
        ...state,
        isLoading:false,
        posts:payload
       
      };
    }

    case FETCH_DATA_FAILURE: {
      return {
        ...state,
        isLoading:false,
        isError:true
        
      };
    }

    case CREATE_POST_REQUEST: {
      return {
        ...state,
        isLoading:true
       
      };
    }

    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        isLoading:false,
        posts:[...state.posts,payload]
       
      };
    }

    case CREATE_POST_FAILURE: {
      return {
        ...state,
        isLoading:false,
        isError:true
        
      };
    }

    case UPDATE_POST:{
      return {
        ...state,
        posts:state.posts.map((p)=>p._id===payload._id?payload:p)
      }
    }

    default: {
      return state;
    }
  }
};
