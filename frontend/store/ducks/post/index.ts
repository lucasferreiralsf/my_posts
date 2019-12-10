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
  loading: false,
  error: false
};

const reducer: Reducer<PostsState> = (state = postsInitialState, action) => {
  switch (action.type) {
    case PostTypes.POST_GET_ALL:
      return { ...state, loading: true };
    case PostTypes.POST_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data
      };
    case PostTypes.POST_GET_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        data: postsInitialState.data
      };

    default:
      return state;
  }
};

export default reducer;
