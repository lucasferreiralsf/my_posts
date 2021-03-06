import { action } from 'typesafe-actions';

import { SignupForm, SignUpTypes, SignUpPayload } from './types';

export const signUpRequest = (data: SignupForm) =>
  action(SignUpTypes.SIGNUP_REQUEST, { data });

export const signUpSuccess = (data: SignUpPayload) =>
  action(SignUpTypes.SIGNUP_SUCCESS, { data });

export const signUpFailure = (data: {
  statusCode: string;
  error: string;
  message: string;
  timestamp: string;
  path: string;
}) => action(SignUpTypes.SIGNUP_FAILURE, { data });
