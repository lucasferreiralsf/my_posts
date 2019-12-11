import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Grid,
  InputAdornment,
  Button,
  Fab,
  CircularProgress
} from '@material-ui/core';
import PostCard from './PostCard';
import EmptyIcon from '../CustomIcons/EmptyIcon';
import { PaginatedResponse } from '../../utils/paginatedResponse';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import {
  PostsState,
  PostTypes,
  IPost,
  IPostContent,
  PostState
} from '../../store/ducks/post/types';
import { AppState } from '../../store/ducks/rootReducer';
import { SignInState } from '../../store/ducks/auth/types';
import TextField from '../TextField';
import { MdEdit } from 'react-icons/md';
import useForm from 'react-hook-form';
import { useSnackbar } from 'notistack';
import {
  postGetAllRequest,
  likePostRequest,
  editPostRequest,
  deletePostRequest,
  sendNewPostRequest
} from '../../store/ducks/post/actions';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    width: '100%',
    padding: theme.spacing(4)
  },
  media: {
    height: 140
  },
  badgeMargin: {
    margin: theme.spacing(2)
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    marginBottom: theme.spacing(4)
  },
  buttonCadastrar: {},
  buttonCancelar: {
    marginRight: theme.spacing(2)
  },
  loadMoreContainer: {
    marginTop: theme.spacing(6)
  },
  progress: {
    color: 'white'
  }
}));

type Props = {
  auth?: boolean;
};

const PostCardList = ({ auth }: Props) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(2);
  const [submitAction, setSubmitAction] = useState({ action: null, _id: null });

  const posts: PostsState = useSelector(
    (state: AppState) => state.posts,
    shallowEqual
  );
  const postState: PostState = useSelector(
    (state: AppState) => state.post,
    shallowEqual
  );

  const authState: SignInState = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  const { register, handleSubmit, errors, getValues, setValue } = useForm<
    IPostContent
  >({
    mode: 'onChange'
  });

  useEffect(() => {
    if (postState.data && postState.data._id) {
      if (postState.actionType === PostTypes.SEND_NEW_POST_SUCCESS) {
        setValue('content', '');
        dispatch(postGetAllRequest());
        enqueueSnackbar('Post criado com sucesso!', {
          variant: 'success',
          preventDuplicate: true
        });
      }
      if (postState.actionType === PostTypes.EDIT_POST_SUCCESS) {
        setValue('content', '');
        dispatch(postGetAllRequest());
        enqueueSnackbar('Post editado com sucesso!', {
          variant: 'success',
          preventDuplicate: true
        });
      }
    }
    if (postState.actionType === PostTypes.DELETE_POST_SUCCESS) {
      setValue('content', '');
      dispatch(postGetAllRequest());
      enqueueSnackbar('Post deletado com sucesso!', {
        variant: 'success',
        preventDuplicate: true
      });
    }
  }, [postState.data]);

  useEffect(() => {
    if (postState.error) {
      enqueueSnackbar(postState.errorMessage.errorMessage, {
        variant: 'error',
        preventDuplicate: true
      });
    }
  }, [postState.error]);

  useEffect(() => {
    dispatch(postGetAllRequest());
  }, []);

  useEffect(() => {}, [posts.data]);

  const onSubmit = data => {
    if (submitAction.action === 'EDIT') {
      dispatch(
        editPostRequest({
          _id: submitAction._id,
          token: authState.data.token,
          data
        })
      );
    } else {
      dispatch(sendNewPostRequest({ data, token: authState.data.token }));
    }
  };

  const handleEdit = (content: string, _id) => {
    setSubmitAction({ action: 'EDIT', _id });
    setValue('content', content);
  };

  const handleCancelEdit = () => {
    setSubmitAction({ action: null, _id: null });
    setValue('content', '');
  };

  const handleDelete = _id => {
    dispatch(
      deletePostRequest({
        _id,
        token: authState.data.token
      })
    );
  };

  const carregarMais = () => {
    setPage(page + 1);
    dispatch(postGetAllRequest(posts.limit * page));
  };

  return (
    <div className={classes.root}>
      {authState.auth && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.formContainer}
        >
          <Grid container alignItems="center" justify="center">
            <Grid item xs={6}>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="row"
              >
                <Grid item xs={8}>
                  <TextField
                    id="content"
                    label="Conteúdo do post"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdEdit />
                        </InputAdornment>
                      )
                    }}
                    multiline
                    rows={4}
                    rowsMax={8}
                    name="content"
                    size="small"
                    errors={{
                      hasError: errors.content !== undefined ? true : false,
                      message:
                        errors.content !== undefined
                          ? errors.content.message
                          : false
                    }}
                    inputRef={register({
                      required: 'Este campo é obrigatório.'
                    })}
                  />
                </Grid>
                <Grid item xs={4}>
                  {submitAction.action === 'EDIT' && (
                    <Button
                      variant="outlined"
                      color="default"
                      type="button"
                      size="small"
                      className={classes.buttonCancelar}
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                    className={classes.buttonCadastrar}
                    disabled={
                      errors.content !== undefined || getValues().content === ''
                        ? true
                        : false
                    }
                  >
                    {submitAction.action === 'EDIT' ? 'Salvar' : 'Cadastrar'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
      {posts && posts.data.docs && posts.data.docs.length > 0 ? (
        <div>
          <Grid container spacing={3} className={classes.gridContainer}>
            {posts.data.docs.map(post => (
              <Grid item xs={3} key={post._id}>
                <PostCard
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
          {posts.data.totalDocs > posts.data.limit && (
            <Grid
              container
              alignItems="center"
              justify="center"
              className={classes.loadMoreContainer}
            >
              {posts.loading ? (
                <Fab color="primary">
                  <CircularProgress className={classes.progress} />
                </Fab>
              ) : (
                <Fab variant="extended" color="primary" onClick={carregarMais}>
                  Carregar mais...
                </Fab>
              )}
            </Grid>
          )}
        </div>
      ) : (
        <EmptyIcon />
      )}
    </div>
  );
};

export default PostCardList;
