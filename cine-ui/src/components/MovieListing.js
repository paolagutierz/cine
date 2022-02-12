import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router";

const MovieListing = ({ image, title, format, description, id }) => {
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
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
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
            color="error"
            variant="contained"
            onClick={(e) => handleRedirect(e, `/movies/${id}`.toLowerCase())}>
            Ver Detalles
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieListing;
