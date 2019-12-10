import { call, put } from "redux-saga/effects";
import fetch from "isomorphic-unfetch";

import { postGetAllSuccess, postGetAllFailure } from "./actions";
import { login, logout } from "../../../utils/auth";

const api = (url, options) => {
  return fetch(url, options);
};

export function* postGetAll() {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/post`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) throw yield response.json();
    response = yield response.json();
    yield put(postGetAllSuccess(response));
  } catch (error) {
    yield put(postGetAllFailure());
  }
}
