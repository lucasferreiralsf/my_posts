import { action } from "typesafe-actions";
import { SigninForm, AuthTypes, SignInPayload } from "./types";

export const signInRequest = (data: SigninForm) =>
  action(AuthTypes.SIGNIN_REQUEST, { data });

export const signInSuccess = (data: SignInPayload) =>
  action(AuthTypes.SIGNIN_SUCCESS, { data });

export const signInFailure = errorMessage =>
  action(AuthTypes.SIGNIN_FAILURE, { errorMessage });

export const signOutRequest = () => action(AuthTypes.SIGNOUT_REQUEST);
