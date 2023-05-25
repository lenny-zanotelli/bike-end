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
import { memo, useEffect } from 'react';
import destinationImage from '../../../assets/images/result-card_background.png';
import { Journey } from '../../../@types/journey';
import {
  getAllFavorite,
  removeFavoriteCard,
  sendFavoriteCard,
} from '../../../store/reducers/favorite';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

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
  const favorites = useAppSelector((state) => state.favorite.favorite);
  // const [storedFavorites, setStoredFavorites] = useState<Journey[]>([]);

  // useEffect(() => {
  //   dispatch(getAllFavorite());
  //   const storedFavoritesJSON = localStorage.getItem('favorites');
  //   if (storedFavoritesJSON) {
  //     const favoriteIds = JSON.parse(storedFavoritesJSON);
  //     const storedFavoritesTest = favorites.filter(
  //       (favorite) => favoriteIds.includes(favorite.to.id),
  //     );
  //     setStoredFavorites(storedFavoritesTest);
  //   } else {
  //     setStoredFavorites([]);
  //   }
  // }, []);
  useEffect(() => {
    dispatch(getAllFavorite());
  }, [dispatch]);

  const handleFavoriteClick = (journey: Journey) => {
    const isFavorite = favorites.some((favorite) => favorite.to.id === journey.to.id);
    if (isFavorite) {
      dispatch(removeFavoriteCard(journey.queryUrl)).then(() => {
        // Suppression réussie, mettez à jour l'état des favoris dans le store
        dispatch(getAllFavorite());
      });
    } else {
      dispatch(sendFavoriteCard(journey)).then(() => {
        // Ajout réussi, mettez à jour l'état des favoris dans le store
        dispatch(getAllFavorite());
      });
    }
  };

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
        {favorites.map((favorite) => (
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
                onClick={() => handleFavoriteClick(favorite)}
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
