import './styles.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [checked, setChecked] = React.useState(true);

  // eslint-disable-next-line max-len
  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setChecked(event.target.checked);
    console.log('test checkbox');
  };

  return (
    <main className="container">

      <div className="container__createAccount">
        <h2 className="container__createAccount__title">Créer mon compte</h2>
        <form className="container__createAccount__form">
          <TextField
            required
            fullWidth
            name="firstName"
            label="Prénom"
            value={formData.firstName}
            onChange={handleInputChange}
          />

          <TextField
            required
            fullWidth
            name="lastName"
            label="Nom"
            value={formData.lastName}
            onChange={handleInputChange}
          />

          <TextField
            required
            fullWidth
            type="email"
            name="email"
            label="Adresse e-mail"
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextField
            required
            fullWidth
            type="password"
            name="password"
            label="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
          />

          <TextField
            required
            fullWidth
            type="password"
            name="confirmPassword"
            label="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />

          <div className="container__createAccount__form_cgu">
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
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
