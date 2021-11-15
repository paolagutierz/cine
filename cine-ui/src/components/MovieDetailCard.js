import React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const MovieDetailCard = ({ img, tittle, description }) => {
  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia component="img" height="400" image={img} alt={tittle} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MovieDetailCard;
