import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./Auth/authReducer";
import { postReducer } from "./Posts/postReducer";
// import { registerReducer } from "./register/registerReducer";

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

const customThunkMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};

// or use Thunk middleware directly

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(customThunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
