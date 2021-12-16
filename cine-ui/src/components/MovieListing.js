import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router";

const MovieListing = ({ img, tittle, format, description }) => {
  const history = useHistory();
  const handleRedirect = (e, path) => {
    e.preventDefault();
    history.push(path);
  };
  return (
    <Grid item xs={10} sm={6} md={4} sx={{ mt: 2 }}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: 1,
          m: 1,
          maxWidth: 280,
        }}>
        <CardMedia
          sx={{ maxWidth: 250 }}
          component="img"
          height="auto"
          image={img}
          alt={tittle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {tittle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Formato:{format}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={(e) =>
              handleRedirect(e, `/movies/${tittle}`.toLowerCase())
            }>
            Ver Detalles
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieListing;
