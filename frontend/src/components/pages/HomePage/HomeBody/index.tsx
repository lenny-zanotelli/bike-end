import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
  containerBody: {
    m: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media screen and (min-width: 900px)': {
      marginTop: '4rem',
    },
  },
  bodyContent: {
    textAlign: 'center',
    fontSize: '1rem',
    py: '0.5rem',
    '@media screen and (min-width: 900px)': {
      fontSize: '1.15rem',
      fontWeight: 'bold',
    },
  },
  connectBtn: {
    fontSize: '0.7rem',
    color: '#788896',
    textDecoration: 'underline',
    textDecorationColor: '#CED4D9',
    textUnderlineOffset: '3px',
    my: '0.5rem',
  },
  createAccountBtn: {
    backgroundColor: '#207868',
    ':hover': {
      backgroundColor: '#0b5447',
    },
  },
};

function HomeBody() {
  return (
    <Box
      className="container__body"
      component="main"
      sx={styles.containerBody}
    >
      <Typography
        className="body__content"
        paragraph
        sx={styles.bodyContent}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Aperiam odit,
        praesentium saepe qui eveniet
        amet facere ratione vel distinctio.
      </Typography>
      <Link to="signup">
        <Button
          className="body__create-account-btn"
          variant="contained"
          size="large"
          sx={styles.createAccountBtn}
        >
          Rejoindre l&apos;Aventure
        </Button>
      </Link>
      <Link to="login">
        <Button
          className="body__connect-btn"
          variant="text"
          size="small"
          sx={styles.connectBtn}
        >
          Se connecter
        </Button>
      </Link>
    </Box>
  );
}

export default HomeBody;
