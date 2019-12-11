import { PostTypes, PostsState } from "./types";
import { Reducer } from "redux";

const postsInitialState: PostsState = {
  data: {
    docs: [],
    totalDocs: 0,
    limit: 10,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  },
  limit: 10,
  loading: false,
  error: false,
  errorMessage: {
    error: {},
    errorMessage: "",
    status: 0
  }
};

const reducer: Reducer<PostsState> = (state = postsInitialState, action) => {
  switch (action.type) {
    case PostTypes.POST_GET_ALL:
      return { ...state, limit: action.payload && action.payload.limit ? action.payload.limit : state.limit > 0 ? state.limit : postsInitialState.limit, loading: true };
    case PostTypes.POST_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        limit: postsInitialState.limit,
        data: action.payload.data
      };
    case PostTypes.POST_GET_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        limit: postsInitialState.limit,
        data: postsInitialState.data,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default reducer;
