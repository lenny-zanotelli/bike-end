import { Container } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderLoggedIn from './HeaderLoggedIn';

function Header() {
  const isLogged = useAppSelector((state) => state.login.logged);
  return (
    <Container
      component="header"
      disableGutters
      maxWidth={false}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {isLogged ? (
        <HeaderLoggedIn />
      ) : (
        <HeaderLoggedOut />
      )}
    </Container>

  );
}

export default Header;
