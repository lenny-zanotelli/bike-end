import {
  Button, TextField, Checkbox, Container, Box, FormControlLabel, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  KeysOfCredentials, changeCredentialsField, register, toggleAcceptedConditions,
} from '../../store/reducers/login';

const buttonStyle = {
  mt: '1rem',
  py: '0.7rem',
  px: '1.5rem',
  backgroundColor: '#4CAF50',
  ':hover': {
    backgroundColor: '#4CAF50',
  },
  color: 'white',
  border: 'none',
  borderRadius: '3px',

} as const;

const inputStyle = {
  width: '80%',
  my: '0.5rem',
  backgroundColor: 'white',
} as const;

function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const email = useAppSelector((state) => state.login.credentials.email);
  const password = useAppSelector((state) => state.login.credentials.password);
  const firstname = useAppSelector((state) => state.login.credentials.firstname);
  const lastname = useAppSelector((state) => state.login.credentials.lastname);
  const passwordCheck = useAppSelector((state) => state.login.credentials.passwordCheck);
  const acceptedConditions = useAppSelector((state) => state.login.acceptedConditions);
  const isError = useAppSelector((state) => state.login.error);

  const handleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const fieldName = event.target.name as KeysOfCredentials;
    dispatch(changeCredentialsField({
      propertyKey: fieldName,
      value: newValue,
    }));
  };

  const handleChangeCheckBox = () => {
    dispatch(toggleAcceptedConditions());

    console.log('test checkbox');
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    // This regex matches only when all the following are true:
    // password must contain 1 number (0-9)
    // password must contain 1 uppercase letters
    // password must contain 1 lowercase letters
    // password must contain 1 non-alpha numeric number
    // password is 8-16 characters with no space
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
    event.preventDefault();
    if (password !== passwordCheck) {
      console.log('ca match pas');
      return;
    }
    if (!regex.test(password)) {
      console.log('le mot de passe doit contenir...');
      return;
    }
    dispatch(register());
    console.log('submit');
    navigate('/');
  };

  return (
    <Container
      className="container"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: '1.5rem',
        height: '80vh',
      }}
    >
      <Container
        className="container__createAccount"
        maxWidth="sm"
        sx={{
          width: '80vw',
          borderRadius: '5px',
          py: '1rem',
          textAlign: 'center',
          backgroundColor: 'rgb(154, 183, 192, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h2"
          className="container__createAccount__title"
          sx={{
            fontSize: '1.8em',
            mb: '1rem',
          }}
        >
          Créer mon compte
        </Typography>

        <form
          className="container__createAccount__form"
          onSubmit={handleSubmitForm}
        >

          <TextField
          // TODO Créer des errors sous les TextField pour informer l'user
            sx={inputStyle}
            color="success"
            fullWidth
            required
            name="firstname"
            label="Prénom"
            value={firstname}
            onChange={handleChangeField}
            size="small"
          />

          <TextField
            required
            sx={inputStyle}
            color="success"
            name="lastname"
            label="Nom"
            value={lastname}
            onChange={handleChangeField}
            size="small"
          />

          <TextField
            required
            sx={inputStyle}
            color="success"
            type="email"
            name="email"
            label="Adresse e-mail"
            value={email}
            onChange={handleChangeField}
            size="small"
          />

          <TextField
            required
            sx={inputStyle}
            color="success"
            type="password"
            name="password"
            label="Mot de passe"
            value={password}
            onChange={handleChangeField}
            size="small"
          />

          <TextField
            required
            sx={inputStyle}
            color="success"
            type="password"
            name="passwordCheck"
            label="Confirmer le mot de passe"
            value={passwordCheck}
            onChange={handleChangeField}
            size="small"
          />

          <div className="container__createAccount__form_cgu">
            <FormControlLabel
              control={(
                <Checkbox
                  checked={acceptedConditions}
                  onChange={handleChangeCheckBox}
                  color="success"
                />
                )}
              label="J'accepte les CGU"
            />
          </div>

          <Button
            type="submit"
            sx={buttonStyle}
            variant="contained"
          >
            Valider
          </Button>
        </form>
      </Container>
      <Typography
        paragraph
        sx={{
          width: '80%',
          textAlign: 'center',
          mt: '0.5rem',
          fontStyle: 'italic',
        }}
        className="container-text"
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, dicta earum vero.
      </Typography>

    </Container>
  );
}

export default SignupPage;
