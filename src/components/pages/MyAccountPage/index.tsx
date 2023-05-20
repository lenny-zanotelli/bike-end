/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
import {
  Box, Button, Container, Link, List, ListItem, ListItemButton, ListItemText, Modal, TextField, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchUser } from '../../../store/reducers/user';
import {
  KeysOfCredentials, changeCredentialsField, deleteUser, logout,
} from '../../../store/reducers/login';

const styles = {
  containerAccount: {
    width: '70vw',
    mt: '2rem',
    borderRadius: '5px',
    p: '1rem',
    textAlign: 'center',
    backgroundColor: 'rgb(154, 183, 192, 0.3)',
    '@media only screen and (min-device-width : 768px)': {
      maxWidth: '35%',
    },
  },
  containerAccountTitle: {
    fontSize: '2rem',
    py: '1rem',
    px: '2rem',
  },
  buttonStyle: {
    width: '60%',
    mt: '1rem',
    py: '0.7rem',
    px: '1.5rem',
    backgroundColor: 'grey',
    ':hover': {
      backgroundColor: 'lightgrey',
    },
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    '@media only screen and (min-device-width : 768px)': {
      width: '35%',
    },
  },
  inputStyle: {
    width: '80%',
    my: '0.5rem',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
  },
  deleteAccountButton: {
    my: '1rem',
    fontSize: '0.7rem',
  },
};

function MyAccount() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { firstname, lastname, email } = useAppSelector((state) => state.user);
  // MODAL
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const fieldName = event.target.name as KeysOfCredentials;
    dispatch(changeCredentialsField({
      propertyKey: fieldName,
      value: newValue,
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItem = () => {
    setText('');
    handleClose();
  };

  const handleLoggout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser());
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Container
      className="container"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        mt: '1.5rem',
        height: '80vh',
      }}
    >
      <Typography
        variant="h1"
        className="container__account__title"
        sx={{
          fontSize: '1.8em',
          mb: '1rem',
        }}
      >
        Mon compte
      </Typography>
      <Box
        className="container__connect"
        component="section"
        sx={styles.containerAccount}
      >

        <Typography
          variant="h2"
          className="container__createAccount__title"
          sx={{
            fontSize: '1em',
            mb: '1rem',
            py: '1rem',
            px: '2rem',
          }}
        >
          MES INFORMATIONS
          <Button
            startIcon={<EditIcon />}
            onClick={handleOpen}
            sx={{
              position: 'absolute',

            }}
          />
        </Typography>
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            mt: '6.5rem',
          }}
        >

          <Container
            className="container__connect__modal"
            component="section"
            sx={{
              width: '70vw',
              mt: '2rem',
              borderRadius: '5px',
              p: '1rem',
              textAlign: 'center',
              backgroundColor: 'lightgrey',
              '@media only screen and (min-device-width : 768px)': {
                maxWidth: '35%',
              },

            }}
          >
            <Button
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
            <Typography
              variant="h2"
              className="container__createAccount__title"
              sx={{
                fontSize: '1.3em',
                mb: '1rem',
                py: '1rem',
                px: '2rem',
              }}
            >
              Modifier vos informations
            </Typography>
            <TextField
              sx={styles.inputStyle}
              color="success"
              fullWidth
              required
              name="firstname"
              label="Prenom"
              size="small"
            />

            <TextField
              required
              sx={styles.inputStyle}
              color="success"
              name="Nom"
              label="Nom"
              size="small"
            />

            <TextField
              required
              sx={styles.inputStyle}
              color="success"
              type="email"
              name="email"
              label="Email"
              size="small"
            />
            <Button
              sx={{
                mt: '2rem',
                mb: '2rem',
              }}
              variant="contained"
              color="primary"
              onClick={handleAddItem}
            >
              Mettre à jour
            </Button>
          </Container>
        </Modal>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={lastname} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary={firstname} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Link
        sx={{
          mt: '2rem',
          mb: '2rem',
        }}
        href="/"
        underline="hover"
      >
        <FavoriteIcon />
        Mes voyages favoris
      </Link>
      <Button
        fullWidth
        type="submit"
        sx={styles.buttonStyle}
        variant="contained"
        onClick={handleLoggout}
      >
        Se deconnecter
      </Button>
      <Button
        type="submit"
        size="small"
        sx={styles.deleteAccountButton}
        onClick={handleDeleteUser}
      >
        Supprimer mon compte
      </Button>
    </Container>

  );
}

export default MyAccount;
