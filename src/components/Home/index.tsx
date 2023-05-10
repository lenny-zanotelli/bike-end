import { Container } from '@mui/material';
import './styles.scss';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';

function Home() {
  return (
    <Container
      maxWidth="lg"
    >
      <HomeHeader />
      <HomeBody />

    </Container>
  );
}

export default Home;
