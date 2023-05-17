import {
  Container, InputAdornment, TextField, Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const styles = {
  container: {
    // m: '2rem',
  },
  containerTitle: {
    fontSize: '1.2rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerSearchForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.7rem',
    px: '1.5rem',
  },
  // // searchFormInputCity: {
  //   backgroundImage: `url(${mapPointerIcon})`,
  //   backgroundSize: '20px',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundPosition: 'bottom 50% right 4%',
  // },
} as const;

function SearchBody() {
  return (
    <Container
      component="main"
      className="container"
      sx={styles.container}
    >
      <Typography
        component="h1"
        className="container__title"
        sx={styles.containerTitle}
      >
        De nouveaux horizons à découvrir. En selle !
      </Typography>
      <Container
        component="section"
        className="container__search-form"
        sx={styles.containerSearchForm}
      >
        <TextField
          className="search-form__input-city"
          fullWidth
          name="city-start"
          placeholder="Lieu de départ"
          aria-placeholder="Lieu de départ"
          color="success"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="search-form__input-city"
          fullWidth
          name="city-end"
          placeholder="Lieu d'arrivé"
          aria-placeholder="Lieu d'arrivé"
          color="success"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
        <Container
          component="section"
          className="search-form__filter-section"
        />
        <TextField />
        <TextField />
      </Container>
    </Container>

  );
}

export default SearchBody;
