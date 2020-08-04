import { MatUI } from '../deps.tsx';
const theme = MatUI.createMuiTheme({
  palette: {
    primary: {
      main: '#26a69a',
    },
    secondary: {
      main: '#fbc02d',
    },
    error: {
      main: '#00695c',
    },
    background: {
      default: '#52c7b8',
    },
  },
});

export default theme;
