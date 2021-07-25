import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  FETCH_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  FETCH_BY_SEARCH,
} from "./actionTypes";

const init = {
  isLoading: false,
  isError: false,
  post: null,
  posts: [],
  currentPage: 1,
  totalPages: null,
};

export const postReducer = (state = init, { type, payload }) => {
  switch (type) {
    case FETCH_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_POST: {
      return {
        ...state,
        isLoading: false,
        post: payload,
      };
    }

    case FETCH_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        posts: payload.data,
        currentPage: payload.currentPage,
        totalPages: payload.totalPages,
      };
    }
    case FETCH_BY_SEARCH: {
      return {
        ...state,
        isLoading: false,
        posts: payload,
      };
    }

    case FETCH_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case CREATE_POST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, payload],
      };
    }

    case CREATE_POST_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case UPDATE_POST:
    case LIKE_POST: {
      return {
        ...state,
        posts: state.posts.map((p) => (p._id === payload._id ? payload : p)),
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p._id !== payload),
      };
    }

    default: {
      return state;
    }
  }
};
