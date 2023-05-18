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
    '@media screen and (min-width : 768px)': {
      display: 'flex',
      justifyContent: 'space-around',
      gap: '15rem',
      alignItems: 'center',
      textAlign: 'center',
      width: '100vw',
      height: '5rem',
      px: '3rem',
      m: '0',
      marginBottom: '1rem',
      background: '#D1EFEC',
    },
  },
  headerTitleTagline: {
    '@media screen and (min-width : 768px)': {
      display: 'flex',
      width: '60rem',
      alignItems: 'center',
    },
  },
  headerTagline: {
    '@media screen and (min-width: 768px)': {
      paddingLeft: '0.7rem',
      fontSize: '1.44rem',
    },
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
      maxWidth={false}
      sx={styles.header}
    >
      <Link
        className="header__link"
        href="/"
      >
        <TravelExploreRoundedIcon
          fontSize="large"
          color="action"
        />
      </Link>
      <Container
        component="section"
        className="header__title-tagline"
        sx={styles.headerTitleTagline}

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
          sx={styles.headerTagline}
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
          color="action"
        />
      </Link>

    </Container>
  );
}

export default SearchHeader;
