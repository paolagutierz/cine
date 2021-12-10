import React, { useState } from "react";
import Page from "../components/Page";
import Seats from "../components/Seats";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Card, CardContent, Container } from "@mui/material";
import encanto from "../img/promo/encanto2.jpg";
import MovieDetailCard from "../components/MovieDetailCard";

export const details = {
  img: encanto,
  tittle: "Encanto",
  format: "2D",
  schedules: [
    { date: "14/11/2021", time: ["13:00", "16:00"] },
    { date: "15/11/2021", time: ["9:00", "18:00", "21:00"] },
    { date: "16/11/2021", time: ["17:00", "20:00", "22:00"] },
  ],
  description:
    "ENCANTO cuenta la historia de los Madrigal una familia extraordinaria que vive escondida en las montañas de Colombia, en una casa mágica, en un pueblo vibrante, en un lugar maravilloso conocido como un Encanto. La magia de este Encanto ha bendecido a todos los niños y niñas de la familia con un don único, desde súper fuerza hasta el poder de sanar. A todos, excepto a Mirabel. Pero cuando descubre que la magia que rodea al Encanto corre peligro, Mirabel decide que ella, la única Madrigal sin poderes mágicos, podría ser la última esperanza de su excepcional familia.",
};

const seatSelectedResponse = {
  A: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
  B: { 1: false, 2: false, 3: true, 4: true, 5: false, 6: false },
  C: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
  D: { 1: false, 2: false, 3: false, 4: false, 5: true, 6: true },
};

const deepClone = (object) => JSON.parse(JSON.stringify(object));

const MovieDetails = () => {
  const [dateSelected, setDateSelected] = useState("");
  const [timeSelected, setTimeSelected] = useState("");
  const [seatSelected, setSeatSelected] = useState(
    deepClone(seatSelectedResponse)
  );
  const [seatsNumb, setSeatsNumb] = useState(0);

  const handleSelectSeat = (row, column) => {
    setSeatsNumb(seatsNumb + 1);
    const seatSelectedCopy = deepClone(seatSelected);
    seatSelectedCopy[`${row}`][`${column}`] = true;
    setSeatSelected(seatSelectedCopy);
  };

  const handleTimeSelected = (value) => {
    //llamar a la api para obtener datos de las sillas reservadas
    setSeatSelected(deepClone(seatSelectedResponse));
    setSeatsNumb(0);
    setTimeSelected(value);
  };

  return (
    <Page>
      <Container fixed>
        <Grid container spacing={2} sx={{ minheight: "75vh" }}>
          <Container>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ mt: 4 }}>
              <MovieDetailCard
                img={details.img}
                tittle={details.tittle}
                description={details.description}></MovieDetailCard>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" component="div">
                  {details.tittle} {details.format}
                </Typography>
                <Grid container rowSpacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={4}>
                    <Typography>Fechas:</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <ButtonGroup size="large" aria-label="large button group">
                      {details.schedules.map((schedule, i) => (
                        <Button
                          variant={
                            dateSelected === schedule.date
                              ? "contained"
                              : "outlined"
                          }
                          key={i}
                          onClick={() => setDateSelected(schedule.date)}>
                          {schedule.date}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Grid>

                  {dateSelected !== "" && (
                    <>
                      <Grid item xs={4}>
                        <Typography>Horas:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <ButtonGroup
                          size="large"
                          aria-label="large button group">
                          {details.schedules
                            .filter(
                              (schedule) => schedule.date === dateSelected
                            )[0]
                            .time.map((value, i) => (
                              <Button
                                variant={
                                  timeSelected === value
                                    ? "contained"
                                    : "outlined"
                                }
                                key={i}
                                onClick={() => handleTimeSelected(value)}>
                                {value}
                              </Button>
                            ))}
                        </ButtonGroup>
                      </Grid>
                    </>
                  )}

                  {timeSelected !== "" && (
                    <Grid item xs={12}>
                      <Seats
                        seatSelected={seatSelected}
                        handleSelectSeat={handleSelectSeat}></Seats>
                    </Grid>
                  )}

                  {seatsNumb > 0 && (
                    <Grid item xs={12}>
                      <Card>
                        <CardContent
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                          <Typography>Numero de Sillas:{seatsNumb}</Typography>
                          <Typography>Total:${seatsNumb * 20000}</Typography>
                          <Button variant="contained">Reservar</Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </Page>
  );
};

export default MovieDetails;