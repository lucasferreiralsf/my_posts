import { SignInState, AuthTypes } from "./types";
import { Reducer } from "redux";

const signInInitialState: SignInState = {
  data: {
    firstName: "",
    lastName: "",
    token: "",
    _id: ""
  },
  loading: false,
  error: false
};

const reducer: Reducer<SignInState> = (state = signInInitialState, action) => {
  switch (action.type) {
    case AuthTypes.SIGNIN_REQUEST:
      return { ...state, loading: true, data: action.payload.data };
    case AuthTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data
      };
    case AuthTypes.SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        data: {
          firstName: "",
          lastName: "",
          token: "",
          _id: ""
        }
      };
    case AuthTypes.SIGNOUT_REQUEST:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          firstName: "",
          lastName: "",
          token: "",
          _id: ""
        }
      };

    default:
      return state;
  }
};

export default reducer;
