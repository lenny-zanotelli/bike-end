import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCallback, useEffect, useState } from 'react';
import destinationImage from '../../../assets/images/result-card_background.png';
import { Journey } from '../../../@types/journey';
import {
  getAllFavorite,
  removeFavoriteCard,
} from '../../../store/reducers/favorite';
import { useAppDispatch } from '../../../hooks/redux';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
    width: '80%',
    height: '100vh',
    overflow: 'auto',
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
    top: '8px',
    left: '8px',
  },
} as const;

function FavoritePage() {
  const dispatch = useAppDispatch();
  const [storedFavorites, setStoredFavorites] = useState<Journey[]>([]);

  useEffect(() => {
    dispatch(getAllFavorite());
    const storedFavoritesJSON = localStorage.getItem('favorites');
    if (storedFavoritesJSON) {
      const parsedFavorites = JSON.parse(storedFavoritesJSON);
      setStoredFavorites(parsedFavorites);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavoriteClick = useCallback(
    (index: number) => {
      const updatedFavorites = [...storedFavorites];
      const removedFavorite = updatedFavorites.splice(index, 1)[0];
      setStoredFavorites(updatedFavorites);

      dispatch(removeFavoriteCard(removedFavorite.queryUrl));

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    },
    [dispatch, storedFavorites],
  );

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{ height: '80vh', overflow: 'auto' }}
    >
      <Typography
        component="h2"
        color="black"
        align="center"
        sx={{
          fontSize: '1em',
          fontWeight: 'bold',
        }}
      >
        Favoris
      </Typography>
      <Grid
        component="section"
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        {storedFavorites.map((favorite: Journey, index: number) => (
          <Grid
            component="article"
            item
            key={favorite.to.id}
            xs={5}
            sm={8}
            md={3}
          >
            <Card sx={styles.card}>
              <IconButton
                sx={styles.favoriteIcon}
                onClick={() => handleFavoriteClick(index)}
              >
                <FavoriteIcon sx={{ color: 'red' }} />
              </IconButton>
              <CardMedia
                sx={styles.image}
                component="img"
                image={destinationImage}
                alt={favorite.to.name}
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
                  {favorite.to.name}
                </Typography>
                <Typography color="black" align="center" sx={{ fontSize: '0.8em' }}>
                  {new Date(favorite.duration * 1000).toISOString().slice(11, 19)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FavoritePage;
