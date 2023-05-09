import './styles.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SetStateAction, useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log(`email : ${email} et password : ${password}`);
    event.preventDefault();
    // logique d'authentification / appel API + jeton JWT
    // Redirection si login OK
  };

  return (

    <main className="container">
      <section className="container__connect">
        <h2 className="container__connect__title">Connexion</h2>

        <form className="container__connect__form" onSubmit={handleSubmit}>
          <TextField
            sx={{ width: '80%' }}
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Adresse email"
            name="email"
            value={email}
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
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
        <a className="container__connect__forgotPassword" href="/">Mot de passe oublié ?</a>
      </section>
    </main>
  );
}

export default LoginPage;
