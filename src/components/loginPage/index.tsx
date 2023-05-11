import './styles.scss';
import {
  Button, Container, Box, TextField, Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

const styles = {
  containerConnect: {
    width: '70vw',
    mt: '3rem',
    borderRadius: '5px',
    p: '1rem',
    textAlign: 'center',
    backgroundColor: 'rgb(154, 183, 192, 0.3)',
    '@media only screen and (min-device-width : 768px)': {
      maxWidth: '35%',
    },
  },
  containerConnectTitle: {
    fontSize: '2rem',
    py: '1rem',
    px: '2rem',
  },
  input: {
    width: '80%',
    my: '0.5rem',
    backgroundColor: 'white',
  },
  containerConnectFormBtn: {
    my: '1rem',
    backgroundColor: '#207868',
    ':hover': {
      backgroundColor: '#0b5447',
    },
  },
  containerConnectForgotPassword: {
    my: '1rem',
    fontSize: '0.7rem',
  },
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`email : ${email} et password : ${password}`);
    // logique d'authentification / appel API + jeton JWT
    // Redirection si login OK
  };

  return (

    <Container
      className="container"
      component="main"
      maxWidth="lg"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        className="container__connect"
        component="section"
        sx={styles.containerConnect}
      >
        <Typography
          className="container__connect__title"
          component="h2"
          sx={styles.containerConnectTitle}
        >
          Connexion
        </Typography>

        <form
          className="container__connect__form"
          onSubmit={handleSubmit}
        >
          <TextField
            sx={styles.input}
            color="success"
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Adresse email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <TextField
            sx={styles.input}
            color="success"
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
          />
          <Button
            className="container__connect__form-btn"
            sx={styles.containerConnectFormBtn}
            type="submit"
            size="large"
            variant="contained"
          >
            Valider
          </Button>
        </form>
        <Button
          className="container__connect__forgotPassword"
          size="small"
          sx={styles.containerConnectForgotPassword}
        >
          Mot de passe oublié ?
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
