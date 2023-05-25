 return (
    <Container component="main" maxWidth={false} sx={{ height: '80vh', overflow: 'auto' }}>
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
        {favoriteCards.map((result: Journey) => (
          <Grid
            component="article"
            item
            key={result.from.id}
            xs={5}
            sm={8}
            md={3}
          >
            <Card sx={styles.card}>
              <IconButton
                sx={styles.favoriteIcon}
              >
                <FavoriteIcon sx={{ color: 'red' }} />
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