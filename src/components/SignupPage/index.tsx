import './styles.scss';
import {
  Button, TextField, Checkbox, Container, Box, FormControlLabel, Typography,
} from '@mui/material';

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
  // const [checked, setChecked] = useState(true);
  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  const email = useAppSelector((state) => state.login.credentials.email);
  const password = useAppSelector((state) => state.login.credentials.password);
  const firstname = useAppSelector((state) => state.login.credentials.firstname);
  const lastname = useAppSelector((state) => state.login.credentials.lastname);
  const confirmPassword = useAppSelector((state) => state.login.credentials.confirmPassword);
  const acceptedConditions = useAppSelector((state) => state.login.acceptedConditions);

  // const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   dispatch((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  const handleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const fieldName = event.target.name as KeysOfCredentials;
    dispatch(changeCredentialsField({
      propertyKey: fieldName,
      value: newValue,
    }));
  };

  // eslint-disable-next-line max-len
  const handleChangeCheckBox = () => {
    dispatch(toggleAcceptedConditions());
    console.log('test checkbox');
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('ca match pas');
    } else {
      dispatch(register());
      console.log('submit');
    }

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
            name="confirmPassword"
            label="Confirmer le mot de passe"
            value={confirmPassword}
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
