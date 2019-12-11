import { combineReducers } from "redux";
import auth from "./auth";
import signup from "./signup";
import post from "./post/post";
import posts from "./post/posts";

const rootReducer = combineReducers({
  auth,
  signup,
  posts,
  post,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
