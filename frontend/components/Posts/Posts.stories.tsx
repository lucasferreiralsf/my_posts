import React from 'react';
import { linkTo } from '@storybook/addon-links';
import PostCard from './PostCard';
import PostCardList from './PostCardList';

export default {
  title: 'Posts'
};

export const postCard = () => (
  <PostCard
    onDelete={id => {}}
    onEdit={(content, id) => {}}
    post={{
      upVotes: [
        {
          _id: '5defdc677f9cce01ed1a495a',
          firstName: 'User 2',
          lastName: 'Teste 2',
          email: '123@teste.com',
          id: '5defdc677f9cce01ed1a495a'
        }
      ],
      _id: '5defdcbe7f9cce01ed1a495c',
      content: 'Teste de content Lorem Ipsum 123 456',
      createdAt: '2019-12-10T17:58:22.228Z',
      updatedAt: '2019-12-10T17:59:50.122Z',
      __v: 0,
      owner: {
        _id: '5defdc477f9cce01ed1a4959',
        firstName: 'User 1',
        lastName: 'Teste',
        email: 'teste@teste.com',
        id: '5defdc477f9cce01ed1a4959'
      },
      id: '5defdcbe7f9cce01ed1a495c'
    }}
  />
);

postCard.story = {
  name: 'Post Card'
};
const posts = {
  docs: [
    { content: 'teste', owner: { firstName: 'Lucas', lastName: 'Ferreira' } }
  ]
};
export const postList = () => <PostCardList  />;

postList.story = {
  name: 'Post List'
};
