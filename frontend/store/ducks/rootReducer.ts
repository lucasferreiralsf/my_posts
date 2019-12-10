import { combineReducers } from "redux";
import auth from "./auth";
import signup from "./signup";
import posts from "./post";

const rootReducer = combineReducers({
  auth,
  signup,
  posts
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
