import { call, put } from 'redux-saga/effects';
import Router from 'next/router';
import {
  signUpSuccess,
  signUpFailure,
} from './actions';
import { CustomError } from '../../../utils/customError';

const api = (url, options) => {
  return fetch(url, options);
};

export function* signUp(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(action.payload.data),
    });
    if (response.status === 200 || response.status === 201) {
      response = yield response.json();
      yield Router.replace('/');
      yield put(signUpSuccess(response));
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    yield put(signUpFailure(error));
  }
}
