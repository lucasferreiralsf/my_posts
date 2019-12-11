import { PostTypes, PostState } from './types';
import { Reducer } from 'redux';

const postInitialState: PostState = {
  data: {
    upVotes: [],
    _id: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    owner: {
      _id: '',
      email: '',
      firstName: '',
      id: '',
      lastName: ''
    },
    id: ''
  },
  _id: '',
  actionType: PostTypes.POST_GET_ALL,
  token: '',
  loading: false,
  error: false,
  errorMessage: {
    error: {},
    errorMessage: '',
    status: 0
  }
};

const reducer: Reducer<PostState> = (
  state = postInitialState,
  action
) => {
  switch (action.type) {
    case PostTypes.SEND_NEW_POST:
      return {
        ...state,
        actionType: action.type,
        loading: true,
        error: false,
        token: action.payload.token,
        data: action.payload.data
      };
    case PostTypes.SEND_NEW_POST_SUCCESS:
      return {
        ...state,
        actionType: action.type,
        loading: false,
        error: false,
        data: action.payload.data
      };
    case PostTypes.SEND_NEW_POST_FAILURE:
      return {
        ...state,
        actionType: action.type,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
        data: postInitialState.data
      };
    case PostTypes.EDIT_POST:
      return {
        ...state,
        actionType: action.type,
        loading: true,
        error: false,
        data: action.payload.data,
        token: action.payload.token,
        _id: action.payload._id
      };
    case PostTypes.EDIT_POST_SUCCESS:
      return {
        ...state,
        actionType: action.type,
        loading: false,
        error: false,
        data: action.payload.data
      };
    case PostTypes.EDIT_POST_FAILURE:
      return {
        ...state,
        actionType: action.type,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
        data: postInitialState.data
      };
    case PostTypes.DELETE_POST:
      return {
        ...state,
        actionType: action.type,
        loading: true,
        error: false,
        token: action.payload.token,
        _id: action.payload._id
      };
    case PostTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        actionType: action.type,
        loading: false,
        error: false,
        data: action.payload.data
      };
    case PostTypes.DELETE_POST_FAILURE:
      return {
        ...state,
        actionType: action.type,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
        data: postInitialState.data
      };
    case PostTypes.LIKE_POST:
      return {
        ...state,
        actionType: action.type,
        loading: true,
        error: false,
        token: action.payload.token,
        _id: action.payload._id
      };
    case PostTypes.LIKE_POST_SUCCESS:
      return {
        ...state,
        actionType: action.type,
        loading: false,
        error: false,
        _id: action.payload._id,
        data: action.payload.data
      };
    case PostTypes.LIKE_POST_FAILURE:
      return {
        ...state,
        actionType: action.type,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
        _id: '',
        data: postInitialState.data
      };

    default:
      return state;
  }
};

export default reducer;
