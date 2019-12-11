import { PostTypes, LikePostState } from "./types";
import { Reducer } from "redux";

const postsInitialState: LikePostState = {
  data: {
    upVotes: [],
    _id: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    owner: {
      _id: "",
      email: "",
      firstName: "",
      id: "",
      lastName: ""
    },
    id: ""
  },
  _id: "",
  token: "",
  loading: false,
  error: false,
  errorMessage: {
    error: {},
    errorMessage: "",
    status: 0
  }
};

const reducer: Reducer<LikePostState> = (state = postsInitialState, action) => {
  switch (action.type) {
    case PostTypes.LIKE_POST:
      return {
        ...state,
        loading: true,
        error: false,
        token: action.payload.token,
        _id: action.payload._id
      };
    case PostTypes.LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        _id: action.payload._id,
        data: action.payload.data
      };
    case PostTypes.LIKE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
        _id: "",
        data: postsInitialState.data
      };

    default:
      return state;
  }
};

export default reducer;
