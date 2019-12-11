import React from 'react';
import { linkTo } from '@storybook/addon-links';
import Landing from './Landing';

export default {
  title: 'Landing Page',
};

export const toStorybook = () => <Landing />;

toStorybook.story = {
  name: 'to Storybook',
};
