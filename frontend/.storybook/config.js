import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
configure([
  require.context('../components', true, /\**\/*.stories\.tsx$/),
  require.context('../pages', true, /\.stories\.tsx$/),
  require.context('../stories', true, /\.stories\.tsx$/),
], module);


// import { configure } from '@storybook/react'

// const req = require.context('../components', true, /\**\/*.stories.tsx$/)
// function loadStories() {
//   req.keys().forEach(filename => req(filename))
// }

// configure(loadStories, module)