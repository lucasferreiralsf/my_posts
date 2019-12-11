import { action } from "typesafe-actions";
import { PostTypes, PostGetAllPayload, IPost } from "./types";

export const postGetAllRequest = (limit = 10) =>
  action(PostTypes.POST_GET_ALL, { limit });

export const postGetAllSuccess = (data: PostGetAllPayload) =>
  action(PostTypes.POST_GET_ALL_SUCCESS, { data });

export const postGetAllFailure = errorMessage =>
  action(PostTypes.POST_GET_ALL_FAILURE, { errorMessage });

export const sendNewPostRequest = (data: { data; token: string }) =>
  action(PostTypes.SEND_NEW_POST, { data: data.data, token: data.token });

export const sendNewPostSuccess = (data: IPost) =>
  action(PostTypes.SEND_NEW_POST_SUCCESS, { data });

export const sendNewPostFailure = errorMessage =>
  action(PostTypes.SEND_NEW_POST_FAILURE, { errorMessage });

export const likePostRequest = ({ _id, token }: { _id; token: string }) =>
  action(PostTypes.LIKE_POST, { _id, token });

export const likePostSuccess = (data: IPost) =>
  action(PostTypes.LIKE_POST_SUCCESS, { data });

export const likePostFailure = errorMessage =>
  action(PostTypes.LIKE_POST_FAILURE, { errorMessage });
