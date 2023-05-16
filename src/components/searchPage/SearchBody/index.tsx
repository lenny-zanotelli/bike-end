import { Container, Typography } from '@mui/material';

const styles = {

} as const;

function SearchBody() {
  return (
    <Container
      className="container"
    >
      <Typography
        component="h1"
        className="container__title"
      >
        De nouveaux horizons à découvrir. En selle !
      </Typography>
    </Container>

  );
}

export default SearchBody;
