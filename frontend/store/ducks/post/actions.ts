import { action } from 'typesafe-actions';
import {
  PostTypes,
  PostGetAllPayload,
} from './types';

export const postGetAll = () =>
  action(PostTypes.POST_GET_ALL);

export const postGetAllSuccess = (data: PostGetAllPayload) =>
  action(PostTypes.POST_GET_ALL_SUCCESS, { data });
  
export const postGetAllFailure = () => action(PostTypes.POST_GET_ALL_FAILURE);


