import { all, takeLatest} from 'redux-saga/effects';
import { AuthTypes } from './auth/types';
import { signIn, signOut } from './auth/sagas';
import { SignUpTypes } from './signup/types';
import { signUp } from './signup/sagas';
import { PostTypes } from './post/types';
import { postGetAll, sendNewPost, likePost, editPost, deletePost } from './post/sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(AuthTypes.SIGNIN_REQUEST, signIn),
        takeLatest(AuthTypes.SIGNOUT_REQUEST, signOut),
        takeLatest(SignUpTypes.SIGNUP_REQUEST, signUp),
        takeLatest(PostTypes.POST_GET_ALL, postGetAll),
        takeLatest(PostTypes.SEND_NEW_POST, sendNewPost),
        takeLatest(PostTypes.EDIT_POST, editPost),
        takeLatest(PostTypes.DELETE_POST, deletePost),
        takeLatest(PostTypes.LIKE_POST, likePost),
    ])
}