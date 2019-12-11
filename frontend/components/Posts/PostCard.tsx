import React, { useState, useEffect } from "react";
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
  Chip
} from "@material-ui/core";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import Link from "next/link";
import { IPost, LikePostState } from "../../store/ducks/post/types";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppState } from "../../store/ducks/rootReducer";
import { SignInState } from "../../store/ducks/auth/types";
import { likePostRequest } from "../../store/ducks/post/actions";
import { useSnackbar } from "notistack";

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
    width: "100%"
  }
}));

type Props = {
  post: IPost;
};

const LikeButton = ({
  likeCount,
  _id,
  upVotes
}: {
  likeCount: number;
  _id: string;
  upVotes: IPost["upVotes"];
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

const PostCard = (props: Props) => {
  const classes = useStyles({});
  const [post, setPost]: [IPost, (post: IPost) => void] = useState(props.post);
  const { enqueueSnackbar } = useSnackbar();

  const likePostState: LikePostState = useSelector(
    (state: AppState) => state.likePost,
    shallowEqual
  );

  useEffect(() => {
    if (likePostState.data && likePostState.data._id) {
      setPost(likePostState.data);
    }
  }, [likePostState.data]);

  useEffect(() => {
    if (likePostState.error) {
      enqueueSnackbar(likePostState.errorMessage.errorMessage, {
        variant: "error",
        preventDuplicate: true
      })
    }
  }, [likePostState.error]);

  return (
    <Card className={classes.card}>
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
              {post.owner.firstName + " " + post.owner.lastName}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
