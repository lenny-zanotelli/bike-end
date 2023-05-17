import {
  Button,
  Container, InputAdornment, TextField, Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const styles = {
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
  searchFormFilterSection: {
    display: 'flex',
    justifyContent: 'space-between',
    px: '0',
  },
  searchFormInputFilter: {
    padding: '0.6rem',
    width: '40vw',
  },
} as const;

function SearchBody() {
  return (
    <Container
      component="main"
      className="container"
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
          component="article"
          className="search-form__filter-section"
          sx={styles.searchFormFilterSection}
        >
          <TextField
            className="search-form__input-filter"
            type="date"
            name="date"
            color="success"
          />
          <TextField
            className="search-form__input-filter"
            type="time"
            name="time"
            color="success"
          />
        </Container>
      </Container>
      <Container
        component="section"
        className="container__filter-form"
      />
      <Container
        component="article"
      >
        <Typography
          component="h2"
          className="filter-form__title"
        >
          Filtres :
        </Typography>
        <TextField
          type="number"
          placeholder="Budget"
          className="filter-form__input_euro"
        />
        <TextField
          className="filter-form__input_journey-travel"
          type="text"
          placeholder="Temps de trajet"
        />
      </Container>
      <Container
        component="article"
        className="filter-form__btn"
      >
        <Button
          className=""
          type="button"
          size="large"
          variant="contained"
          color="success"
        >
          Recherche
        </Button>
        <Button
          className=""
          type="button"
          size="large"
          variant="contained"
          color="error"
        >
          Réinitialiser
        </Button>

      </Container>
    </Container>

  );
}

export default SearchBody;
