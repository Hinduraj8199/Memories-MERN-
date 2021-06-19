import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { postReducer } from "./Posts/postReducer";
// import { registerReducer } from "./register/registerReducer";

const rootReducer = combineReducers({
  posts: postReducer,
  // register: registerReducer,
});

const customThunkMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(customThunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
