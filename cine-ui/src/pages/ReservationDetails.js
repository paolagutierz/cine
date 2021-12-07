import React, { useState } from "react";
import Page from "../components/Page";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Button,
  Container,
  FormGroup,
  FormControlLabel,
  ButtonGroup,
} from "@mui/material/";
import Checkbox from "@mui/material/Checkbox";
import MovieDetailCard from "../components/MovieDetailCard";
import encanto from "../img/promo/encanto2.jpg";

const details = {
  img: encanto,
  tittle: "Encanto",
  format: "2D",
  fecha: "12/10/2021",
  hora: "12:30pm",
  sillas: [23, 28, 24, 67],
  description:
    "ENCANTO cuenta la historia de los Madrigal una familia extraordinaria que vive escondida en las montañas de Colombia, en una casa mágica, en un pueblo vibrante, en un lugar maravilloso conocido como un Encanto. La magia de este Encanto ha bendecido a todos los niños y niñas de la familia con un don único, desde súper fuerza hasta el poder de sanar. A todos, excepto a Mirabel. Pero cuando descubre que la magia que rodea al Encanto corre peligro, Mirabel decide que ella, la única Madrigal sin poderes mágicos, podría ser la última esperanza de su excepcional familia.",
};

const ReservationDetails = () => {
  return (
    <Page>
      <Container fixed>
        <Grid container spacing={2} sx={{ minheight: "75vh" }}>
          <Container>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mt: 2 }}>
              <MovieDetailCard
                img={details.img}
                tittle={details.tittle}
                description={details.description}></MovieDetailCard>
              <Grid item xs={8}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ mx: 4 }}>
                  {details.tittle} {details.format}
                </Typography>

                <Grid container rowSpacing={2} sx={{ mt: 2, mx: 4 }}>
                  <Grid item xs={8}>
                    <Typography gutterBottom variant="h5" component="div">
                      {details.titulo}
                    </Typography>
                    <Grid
                      item
                      sx={{
                        mx: 2,
                      }}>
                      <Typography>Fecha: {details.fecha}</Typography>
                      <Typography>Hora: {details.hora}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        mt: 2,
                      }}>
                      {" "}
                      Sillas Reservadas:
                    </Typography>
                    <FormGroup
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mt: 2,
                      }}>
                      {details.sillas.map((silla, i) => (
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label={silla}
                        />
                      ))}
                    </FormGroup>
                  </Grid>
                  <ButtonGroup
                    sx={{
                      mt: 3,
                    }}>
                    {" "}
                    <Button variant="contained"> Liberar sillas</Button>
                    <Button variant="contained"> Cancelar Reserva</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </Page>
  );
};

export default ReservationDetails;
