import React, { useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import PostCard from "./PostCard";
import EmptyIcon from "../CustomIcons/EmptyIcon";
import { PaginatedResponse } from "../../utils/paginatedResponse";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { PostsState, PostTypes, IPost } from "../../store/ducks/post/types";
import { AppState } from "../../store/ducks/rootReducer";
import { SignInState } from "../../store/ducks/auth/types";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: theme.spacing(4)
  },
  media: {
    height: 140
  },
  badgeMargin: {
    margin: theme.spacing(2)
  },
  gridContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

type Props = {
  auth?: boolean;
};

const PostCardList = ({ auth }: Props) => {
  const classes = useStyles({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: PostTypes.POST_GET_ALL });

    return () => {}
  }, [null])

  const posts: PostsState = useSelector((state: AppState) => state.posts, shallowEqual);
  const authState: SignInState = useSelector((state: AppState) => state.auth, shallowEqual);

  if(posts.data.docs && posts.data.docs.length > 0) {
    const upTest = posts.data.docs.reduce((prev, current, index, array) => {
      return [...prev, ...current.upVotes];
    }, []);
    // console.log("uptest: ", upTest);
  }

  const getOwnerLiked = (upvotes: IPost["upVotes"]): boolean => {
    const filter = upvotes.filter(el => el._id === authState.data._id);
    if(filter.length >= 1) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className={classes.root}>
      {posts && posts.data.docs && posts.data.docs.length > 0 ? (
        <Grid container spacing={3} className={classes.gridContainer}>
          {posts.data.docs.map(post => (
            <Grid item xs={3} key={post._id}>
              <PostCard
                content={post.content}
                owner={post.owner}
                usersLiked={post.upVotes}
                ownerLiked={getOwnerLiked(post.upVotes)}
                auth={true}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyIcon />
      )}
    </div>
  );
};

export default PostCardList;
