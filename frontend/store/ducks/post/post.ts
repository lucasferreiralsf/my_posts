import { PostTypes, SendNewPostState } from "./types";
import { Reducer } from "redux";

const postsInitialState: SendNewPostState = {
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
  token: "",
  loading: false,
  error: false,
  errorMessage: {
    error: {},
    errorMessage: "",
    status: 0
  }
};

const reducer: Reducer<SendNewPostState> = (
  state = postsInitialState,
  action
) => {
  switch (action.type) {
    case PostTypes.SEND_NEW_POST:
      return {
        ...state,
        loading: true,
        error: false,
        token: action.payload.token,
        data: action.payload.data
      };
    case PostTypes.SEND_NEW_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data
      };
    case PostTypes.SEND_NEW_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
        data: postsInitialState.data
      };

    default:
      return state;
  }
};

export default reducer;
