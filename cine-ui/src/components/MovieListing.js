import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const MovieListing = ({ img, tittle, format, description }) => {
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="300" image={img} alt={tittle} />
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
          <Button size="small">Ver Detalles</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieListing;
