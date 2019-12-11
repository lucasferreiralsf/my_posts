import React, { useState, useEffect } from 'react';
import {
  Badge,
  Typography,
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  IconButton,
  Chip,
  CardHeader,
  Avatar,
  Menu,
  MenuItem
} from '@material-ui/core';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { useSnackbar } from 'notistack';
import { MdMoreVert } from 'react-icons/md';
import { red } from '@material-ui/core/colors';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { compareAsc, formatRelative, parseISO } from 'date-fns';

import { IPost, PostState } from '../../store/ducks/post/types';
import { AppState } from '../../store/ducks/rootReducer';
import { SignInState } from '../../store/ducks/auth/types';
import { likePostRequest } from '../../store/ducks/post/actions';
import { pt, ptBR } from 'date-fns/locale';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  badgeMargin: {
    margin: theme.spacing(2)
  },
  actions: {
    width: '100%'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

type Props = {
  post: IPost;
  onEdit: (content: string, _id: string) => void;
  onDelete: (_id: string) => void;
};

const LikeButton = ({
  likeCount,
  _id,
  upVotes
}: {
  likeCount: number;
  _id: string;
  upVotes: IPost['upVotes'];
}) => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const authState: SignInState = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );

  const likeOnClick = _id => {
    dispatch(likePostRequest({ _id, token: authState.data.token }));
  };

  const getOwnerLiked = (): boolean => {
    if (upVotes.length > 0) {
      const filter = upVotes.filter(el =>
        el && authState.data ? el._id === authState.data._id : []
      );
      if (filter.length >= 1) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      {authState.auth ? (
        likeCount ? (
          <Badge
            color="primary"
            badgeContent={likeCount}
            className={classes.badgeMargin}
          >
            <IconButton
              size="small"
              color="primary"
              onClick={() => likeOnClick(_id)}
            >
              {getOwnerLiked() ? <IoMdHeart /> : <IoMdHeartEmpty />}
            </IconButton>
          </Badge>
        ) : (
          <IconButton
            size="small"
            color="primary"
            onClick={() => likeOnClick(_id)}
          >
            {getOwnerLiked() ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </IconButton>
        )
      ) : likeCount ? (
        <Chip size="small" label={` ${likeCount} curtidas.`} />
      ) : (
        <Chip size="small" label="Entre para curtir esse post." />
      )}
    </div>
  );
};

const PostCard = ({ onEdit, onDelete, ...props }: Props) => {
  const [post, setPost]: [IPost, (post: IPost) => void] = useState(props.post);
  const [anchorEl, setAnchorEl] = useState(null);

  const postState: PostState = useSelector(
    (state: AppState) => state.post,
    shallowEqual
  );

  const authState: SignInState = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  

  const classes = useStyles({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (postState.data && post._id === postState.data._id) {
      setPost(postState.data);
    }
  }, [postState.data]);

  useEffect(() => {
    if (props.post) {
      setPost(props.post);
    }
  }, [props.post]);

  useEffect(() => {
    if (postState.error) {
      enqueueSnackbar(postState.errorMessage.errorMessage, {
        variant: 'error',
        preventDuplicate: true
      });
    }
  }, [postState.error]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.owner.firstName ? post.owner.firstName.substr(0, 1) +
              post.owner.lastName.substr(0, 1) : ''}
          </Avatar>
        }
        action={
          <div>
            {authState.auth && authState.data._id === post.owner._id && (
              <div>
                <IconButton
                  aria-label="card-settings"
                  aria-controls="card-settings-button"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MdMoreVert />
                </IconButton>

                <Menu
                  id="card-settings-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      onEdit(post.content, post._id);
                    }}
                  >
                    Editar
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      onDelete(post._id);
                    }}
                  >
                    Excluir
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        }
        title="Shrimp and Chorizo Paella"
        subheader={formatRelative(
          compareAsc(parseISO(post.createdAt), parseISO(post.updatedAt)) > 0
            ? parseISO(post.createdAt)
            : parseISO(post.updatedAt),
          new Date(), { locale: ptBR}
        )}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/200"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box display="flex" className={classes.actions} alignItems="center">
          <Box flexGrow={1}>
            <LikeButton
              likeCount={
                post.upVotes && post.upVotes.length > 0
                  ? post.upVotes.length
                  : 0
              }
              upVotes={post.upVotes}
              _id={post._id}
            />
          </Box>
          <Box p={1}>
            <Typography
              align="right"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {post.owner.firstName + ' ' + post.owner.lastName}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
