import './styles.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

import { ChangeEvent, FormEvent, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

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
    <main className="container">

      <div className="container__createAccount">
        <h2 className="container__createAccount__title">Créer mon compte</h2>
        <form onSubmit={handleSubmitForm} className="container__createAccount__form">
          <TextField
            required
            fullWidth
            name="firstName"
            label="Prénom"
            value={formData.firstName}
            onChange={handleChangeInput}
          />

          <TextField
            required
            fullWidth
            name="lastName"
            label="Nom"
            value={formData.lastName}
            onChange={handleChangeInput}
          />

          <TextField
            required
            fullWidth
            type="email"
            name="email"
            label="Adresse e-mail"
            value={formData.email}
            onChange={handleChangeInput}
          />

          <TextField
            required
            fullWidth
            type="password"
            name="password"
            label="Mot de passe"
            value={formData.password}
            onChange={handleChangeInput}
          />

          <TextField
            required
            fullWidth
            type="password"
            name="confirmPassword"
            label="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChangeInput}
          />

          <div className="container__createAccount__form_cgu">
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChangeCheckBox} />}
              label="J'accepte les CGU"
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Valider
          </Button>
        </form>
      </div>
      <p className="container-text">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, dicta earum vero.
      </p>

    </main>
  );
}

export default SignupPage;
