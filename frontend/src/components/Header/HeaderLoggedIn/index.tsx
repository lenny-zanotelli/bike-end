import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Container, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styles } from './styles';

function HeaderLoggedIn() {
  return (
    <Container
      component="header"
      className="header"
      maxWidth={false}
      sx={styles.header}
    >
      <Link
        className="header__link"
        to="/"
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
      <Container
        component="section"
        disableGutters
        className="header__container-right-icons"
        sx={styles.headerContainerRightIcons}
      >
        <Link
          className="header__link"
          to="/favorite"
        >
          <FavoriteIcon
            fontSize="large"
            color="action"
          />
        </Link>
        <Link
          className="header__link"
          to="/myaccount"
        >
          <AccountCircleRoundedIcon
            fontSize="large"
            color="action"
          />
        </Link>
      </Container>
    </Container>
  );
}

export default HeaderLoggedIn;
