/* eslint-disable react/jsx-no-bind */
import {
  Card, CardContent, CardMedia, Container, Grid, IconButton, Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import destinationImage from '../../../assets/images/result-card_background.png';
import { Journey } from '../../../@types/journey';

const styles = {

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
    width: '80%',

  },
  card: {
    margin: 'auto',
    position: 'relative',
    border: 'solid 2px',

  },
  image: {
    opacity: 0.2,
    backgroundSize: 'cover',
  },
  content: {
    display: 'block',
    position: 'absolute',
    bottom: 0,
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '70%',
    width: '100%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: '8px',
    right: '8px',
  },

};

function ResultsPage() {
  const [storedJourneysArray, setStoredJourneysArray] = useState<Journey[]>([]);

  useEffect(() => {
    // Récupération des résultats depuis le localStorage
    const results = localStorage.getItem('results');
    if (results) {
      const localStorageResults = JSON.parse(results);
      console.log('RESULT PAGE', localStorageResults);

      setStoredJourneysArray(localStorageResults);
      // Faites ce que vous voulez avec les résultats récupérés...
    }
  }, []);

  return (

    <Container maxWidth={false}>
      <Typography
        color="black"
        align="center"
        sx={{
          fontSize: '1em',
          fontWeight: 'bold',
        }}
      >
        {`De nouveaux horizons à découvrir depuis 
        ${storedJourneysArray.length > 0 ? storedJourneysArray[0].from.name : ''}. 
        En selle !`}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {storedJourneysArray.map((result: Journey) => (
          <Grid item key={result.from.id} xs={6} sm={8} md={3}>
            <Card sx={styles.card}>
              <IconButton sx={styles.favoriteIcon}>
                <FavoriteIcon />
              </IconButton>
              <CardMedia
                sx={styles.image}
                component="img"
                image={destinationImage}
                alt={result.to.name}
              />
              <CardContent sx={styles.content}>
                <Typography
                  color="black"
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.8em',
                  }}
                >
                  {result.to.name}
                </Typography>
                <Typography
                  color="black"
                  align="center"
                  sx={{ fontSize: '0.8em' }}
                >
                  {new Date(result.duration * 1000).toISOString().slice(11, 19)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

  );
}

export default ResultsPage;
