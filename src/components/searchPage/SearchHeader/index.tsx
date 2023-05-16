import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {
  Container, Link, Typography,
} from '@mui/material';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    my: '0.5rem',
  },
  headerTitle: {
    fontSize: '2rem',
    fontStyle: 'italic',
    fontWeight: 'bold',
    ml: '2%',

  },
} as const;

function SearchHeader() {
  return (
    <Container
      component="header"
      className="header"
      sx={styles.header}
    >
      <Link
        className="header__link"
        href="/"
      >
        <TravelExploreRoundedIcon
          fontSize="large"
        />
      </Link>
      <Container
        component="section"
        className="header__title-tagline"

      >
        <Typography
          component="h2"
          className="header__title hidden"
          sx={styles.headerTitle}
        >
          BikeEnd
        </Typography>
        <Typography
          className="header__tagline hidden"
        >
          Le planificateur des week-ends qui font du bien à la tête et à la planète !
        </Typography>
      </Container>
      <Link
        className="header__link"
        href="/myaccount"
      >
        <AccountCircleRoundedIcon
          fontSize="large"
        />
      </Link>

    </Container>
  );
}

export default SearchHeader;
