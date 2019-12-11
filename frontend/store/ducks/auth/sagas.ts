import { call, put } from "redux-saga/effects";
import fetch from "isomorphic-unfetch";

import { signInSuccess, signInFailure, signOutRequest } from "./actions";
import { login, logout } from "../../../utils/auth";
import { CustomError } from "../../../utils/customError";

const api = (url, options) => {
  return fetch(url, options);
};

export function* signIn(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: action.payload.email,
        password: action.payload.password
      })
    });
    if (response.status === 200 || response.status === 201) {
      response = yield response.json();
      yield put(signInSuccess(response));
      login(response);
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut(action) {
  logout();
}
