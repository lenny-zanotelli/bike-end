import { Container } from '@mui/material';
import './styles.scss';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';
import Footer from '../../Footer';

function Home() {
  return (
    <Container
      maxWidth="lg"
      disableGutters
    >
      <HomeHeader />
      <HomeBody />
      <Footer />
    </Container>
  );
}

export default Home;
