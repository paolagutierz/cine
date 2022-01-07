import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Container } from "@mui/material";

const MovieDetail = ({ img, title, format, schedules, description }) => {
  return (
    <Container>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 4 }}>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia component="img" height="400" image={img} alt={title} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Typography gutterBottom variant="h5" component="div">
            {title} {format}
          </Typography>
          <Grid container>
            <ButtonGroup size="large" aria-label="large button group">
              <Button key="one">One</Button>
              <Button key="two">Two</Button>
              <Button key="three">Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetail;
