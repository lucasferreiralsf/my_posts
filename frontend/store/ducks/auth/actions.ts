import { action } from 'typesafe-actions';
import {
  SigninForm,
  AuthTypes,
  SignInPayload,
} from './types';

export const signInRequest = (data: SigninForm) =>
  action(AuthTypes.SIGNIN_REQUEST, { data });

export const signInSuccess = (data: SignInPayload) =>
  action(AuthTypes.SIGNIN_SUCCESS, { data });
  
export const signInFailure = () => action(AuthTypes.SIGNIN_FAILURE);

export const signOutRequest = () => action(AuthTypes.SIGNOUT_REQUEST);
