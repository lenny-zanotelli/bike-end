import './styles.scss';
import {
  Button, Container, Box, TextField, Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

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
    >
      <Box
        className="container__connect"
      >
        <Typography
          className="container__connect__title"
        >
          Connexion
        </Typography>

        <form
          className="container__connect__form"
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ width: '80%' }}
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
            sx={{ width: '80%' }}
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
            sx={{ width: '30%' }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Valider
          </Button>
        </form>
        <Button
          className="container__connect__forgotPassword"
          href="/"
        >
          Mot de passe oublié ?
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
