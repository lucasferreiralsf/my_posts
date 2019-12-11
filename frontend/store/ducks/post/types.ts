import { PaginatedResponse } from "../../../utils/paginatedResponse";
import { string } from "prop-types";
import { CustomError } from "../../../utils/customError";

export enum PostTypes {
  POST_GET_ALL = "POST_GET_ALL",
  POST_GET_ALL_SUCCESS = "POST_GET_ALL_SUCCESS",
  POST_GET_ALL_FAILURE = "POST_GET_ALL_FAILURE",
  SEND_NEW_POST = "SEND_NEW_POST",
  SEND_NEW_POST_SUCCESS = "SEND_NEW_POST_SUCCESS",
  SEND_NEW_POST_FAILURE = "SEND_NEW_POST_FAILURE",
  LIKE_POST = "LIKE_POST",
  LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS",
  LIKE_POST_FAILURE = "LIKE_POST_FAILURE",
  EDIT_POST = "EDIT_POST",
  EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS",
  EDIT_POST_FAILURE = "EDIT_POST_FAILURE",
  DELETE_POST = "DELETE_POST",
  DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS",
  DELETE_POST_FAILURE = "DELETE_POST_FAILURE",
}

export interface UpVotes {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}


export interface Owner {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export type IPost = {
  upVotes?: UpVotes[];
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  owner: Owner;
  id: string;
};

export interface IPostContent {
  content: string;
}

export type PostGetAllPayload = PaginatedResponse<IPost>;

export interface PostState {
  readonly data: IPost;
  readonly _id?: string;
  readonly token?: string;
  readonly actionType: PostTypes;
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorMessage?: CustomError;
}


export interface PostsState {
  readonly data: PostGetAllPayload;
  readonly loading: boolean;
  readonly limit?: number;
  readonly error: boolean;
  readonly errorMessage?: CustomError;
}

