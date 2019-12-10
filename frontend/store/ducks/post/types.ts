import { PaginatedResponse } from "../../../utils/paginatedResponse";

export enum PostTypes {
  POST_GET_ALL = "POST_GET_ALL",
  POST_GET_ALL_SUCCESS = "POST_GET_ALL_SUCCESS",
  POST_GET_ALL_FAILURE = "POST_GET_ALL_FAILURE",
  POST_POST = "POST_POST",
  POST_PUT = "POST_PUT",
  POST_DELETE = "POST_DELETE",
  POST_UPVOTE = "POST_UPVOTE"
}

export type IPost = {
  upVotes?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  }[];
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    id: string;
  };
  id: string;
}

export type PostGetAllPayload = PaginatedResponse<IPost>;

export interface PostState {
  readonly data: IPost;
  readonly loading: boolean;
  readonly error: boolean;
}

export interface PostsState {
  readonly data: PostGetAllPayload;
  readonly loading: boolean;
  readonly error: boolean;
}
