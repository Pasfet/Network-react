import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      body: {
        margin: 0,
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      },
      main: {
        flex: 1
      },
      footer: {
        marginTop: 'auto'
      },
      'h1, h2, h3, h4, h5, h6, p': {
        margin: 0,
        padding: 0
      },
      ul: {
        listStyleType: 'none',
        margin: 0,
        padding: 0
      },
      a: {
        textDecoration: 'none'
      },
      img: {
        display: 'block'
      }
    }
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;