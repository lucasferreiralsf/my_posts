import React from "react";
import { linkTo } from "@storybook/addon-links";
import PostCard from "./PostCard";
import PostCardList from "./PostCardList";

export default {
  title: "Posts"
};

export const postCard = () => (
  <PostCard
    content="Lizards are a widespread group of squamate reptiles, with over 6,000
species, ranging across all continents except Antarctica"
    owner="Lucas Ferreira"
  />
);

postCard.story = {
  name: "Post Card"
};
const posts = { docs: [{ content: "teste", owner: {firstName: "Lucas", lastName: "Ferreira"} }] };
export const postList = () => <PostCardList posts={posts as any} />;

postList.story = {
  name: "Post List"
};
