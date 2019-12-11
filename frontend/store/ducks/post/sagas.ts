import { call, put } from "redux-saga/effects";
import fetch from "isomorphic-unfetch";

import {
  postGetAllSuccess,
  postGetAllFailure,
  sendNewPostSuccess,
  sendNewPostFailure,
  likePostSuccess,
  likePostFailure,
  editPostSuccess,
  editPostFailure,
  deletePostSuccess,
  deletePostFailure
} from "./actions";
import { CustomError } from "../../../utils/customError";
import { signInFailure } from "../auth/actions";

const api = (url, options) => {
  return fetch(url, options);
};

export function* postGetAll(action) {
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/post?limit=${action.payload.limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    );
    if (response.status === 200 || response.status === 201) {
      response = yield response.json();
      yield put(postGetAllSuccess(response));
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(signInFailure(error));
    } else {
      yield put(postGetAllFailure(error));
    }
  }
}

export function* sendNewPost(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${action.payload.token}`
      },
      body: JSON.stringify({
        content: action.payload.data.content
      })
    });
    if (response.status === 200 || response.status === 201) {
      response = yield response.json();
      yield put(sendNewPostSuccess(response));
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(signInFailure(error));
    } else {
      yield put(sendNewPostFailure(error));
    }
  }
}

export function* editPost(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/post/${action.payload._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${action.payload.token}`
      },
      body: JSON.stringify({
        content: action.payload.data.content
      })
    });
    if (response.status === 200 || response.status === 201) {
      response = yield response.json();
      yield put(editPostSuccess(response));
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(signInFailure(error));
    } else {
      yield put(editPostFailure(error));
    }
  }
}

export function* deletePost(action) {
  try {
    let response = yield call(api, `${process.env.BACKEND_URL}/post/${action.payload._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${action.payload.token}`
      },
    });
    if (response.status === 200 || response.status === 201) {
      response = yield response.json();
      yield put(deletePostSuccess(response));
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(signInFailure(error));
    } else {
      yield put(deletePostFailure(error));
    }
  }
}

export function* likePost(action) {
  try {
    let response = yield call(
      api,
      `${process.env.BACKEND_URL}/post/upvote/${action.payload._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${action.payload.token}`
        }
      }
    );
    if (response.status === 200 || response.status === 201) {
      response = yield response.json();
      yield put(likePostSuccess(response));
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(signInFailure(error));
    } else {
      yield put(likePostFailure(error));
    }
  }
}
