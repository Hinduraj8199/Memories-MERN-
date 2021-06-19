import {
  FETCH_DATA_REQUEST ,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
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

    default: {
      return state;
    }
  }
};
