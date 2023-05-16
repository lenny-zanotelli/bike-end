/* eslint-disable react/jsx-no-bind */
import './styles.scss';
import {
  Button, Container, Box, TextField, Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  login, KeysOfCredentials, changeCredentialsField, updateLoginStatus,
} from '../../store/reducers/login';

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
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.login.credentials.email);
  const password = useAppSelector((state) => state.login.credentials.password);
  const isLogged = useAppSelector((state) => state.login.logged);
  // const isLoading = useAppSelector((state) => state.login.error);

  function handleChangeField(event: ChangeEvent<HTMLInputElement>): void {
    const newValue = event.target.value;
    const fieldName = event.target.name as KeysOfCredentials;
    dispatch(changeCredentialsField({
      propertyKey: fieldName,
      value: newValue,
    }));
  }

  function handleSubmitLogin(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    dispatch(login());
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isUserLogged = Boolean(token);
    dispatch(updateLoginStatus(isUserLogged));
  });

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
      {isLogged ? (
        <h2>Tu es connecté</h2>

      ) : (
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
            onSubmit={handleSubmitLogin}
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
              onChange={handleChangeField}
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
              onChange={handleChangeField}
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

      )}
    </Container>
  );
}

export default LoginPage;
