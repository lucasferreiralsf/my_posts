import React from "react";
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
import { IPost } from "../../store/ducks/post/types";

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
  usersLiked?: IPost["upVotes"];
  owner: IPost["owner"];
  ownerLiked: boolean;
  content: string;
  likeOnClick?: Function;
  auth: boolean;

};

const LikeButton = ({ likeCount, ownerLiked, likeOnClick, auth }) => {
  const classes = useStyles({});

  return (
    <div>
      {auth ? (
        likeCount ? (
          <Badge
            color="primary"
            badgeContent={likeCount}
            className={classes.badgeMargin}
          >
            <Link href="/api/post-card/like">
              <IconButton size="small" color="primary">
                {ownerLiked ? <IoMdHeart /> : <IoMdHeartEmpty />}
              </IconButton>
            </Link>
          </Badge>
        ) : (
          <Link href="/api/post-card/like">
            <IconButton size="small" color="primary">
              {ownerLiked ? <IoMdHeart /> : <IoMdHeartEmpty />}
            </IconButton>
          </Link>
        )
      ) : likeCount && (
        <Chip size="small" label={ ` ${likeCount} curtidas.` } />
      )}
    </div>
  );
};

const PostCard = ({
  content,
  usersLiked,
  owner,
  ownerLiked,
  likeOnClick,
  auth
}: Props) => {
  const classes = useStyles({});

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
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box display="flex" className={classes.actions} alignItems="center">
          <Box flexGrow={1}>
            <LikeButton
              likeCount={usersLiked && usersLiked.length > 0 ? usersLiked.length : 0}
              ownerLiked={ownerLiked}
              likeOnClick={likeOnClick}
              auth={auth}
            />
          </Box>
          <Box p={1}>
            <Typography
              align="right"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {owner.firstName + ' ' + owner.lastName}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
