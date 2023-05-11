import './styles.scss';
import {
  Button, TextField, Checkbox, Container, Box, FormControlLabel, Typography,
} from '@mui/material';

import { ChangeEvent, FormEvent, useState } from 'react';

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
  const [checked, setChecked] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // eslint-disable-next-line max-len
  const handleChangeCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log('test checkbox');
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');

    // TODO : dispatch(submitPayload)));
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
            sx={inputStyle}
            color="success"
            fullWidth
            required
            name="firstName"
            label="Prénom"
            value={formData.firstName}
            onChange={handleChangeInput}
            size="small"
          />

          <TextField
            required
            sx={inputStyle}
            color="success"
            name="lastName"
            label="Nom"
            value={formData.lastName}
            onChange={handleChangeInput}
            size="small"
          />

          <TextField
            required
            sx={inputStyle}
            color="success"
            type="email"
            name="email"
            label="Adresse e-mail"
            value={formData.email}
            onChange={handleChangeInput}
            size="small"
          />

          <TextField
            required
            sx={inputStyle}
            color="success"
            type="password"
            name="password"
            label="Mot de passe"
            value={formData.password}
            onChange={handleChangeInput}
            size="small"
          />

          <TextField
            required
            sx={inputStyle}
            color="success"
            type="password"
            name="confirmPassword"
            label="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChangeInput}
            size="small"
          />

          <div className="container__createAccount__form_cgu">
            <FormControlLabel
              control={(
                <Checkbox
                  checked={checked}
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
