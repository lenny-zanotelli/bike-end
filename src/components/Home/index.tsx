import { Container } from '@mui/material';
import './styles.scss';
import HomeHeader from './HomeHeader';

function Home() {
  return (
    <Container
      maxWidth="lg"
    >
      <HomeHeader />

    </Container>
  );
}

export default Home;
