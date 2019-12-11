import { combineReducers } from "redux";
import auth from "./auth";
import signup from "./signup";
import post from "./post/post";
import posts from "./post/posts";
import likePost from "./post/likePost";

const rootReducer = combineReducers({
  auth,
  signup,
  posts,
  post,
  likePost
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
