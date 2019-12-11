import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

export const MY_POSTS_THEME = createMuiTheme({
  palette: {
    primary: {
      main: '#6b63ff',
      light: '#E0DFFD'
    },
    secondary: {
      main: '#FF6B63',
      light: '#FFEBEA'
    },
  },
});