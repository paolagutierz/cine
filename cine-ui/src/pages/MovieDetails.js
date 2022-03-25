import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Page from "../components/Page";
import Seats from "../components/Seats";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Card, CardContent, Container } from "@mui/material";
import { useSnackbar } from "notistack";
import MovieDetailCard from "../components/MovieDetailCard";
import { useParams } from "react-router-dom";
import DialogLS from "../components/DialogLS";

const MovieDetails = ({ user }) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  //estados
  const [dateSelected, setDateSelected] = useState("");
  const [timeSelected, setTimeSelected] = useState("");
  const [seatSelected, setSeatSelected] = useState([]);
  const [seatsNumb, setSeatsNumb] = useState(0);
  const [seatReserved, setSeatReserved] = useState();
  const [movie, setMovie] = useState();
  const [schedules, setSchedules] = useState([]);
  const [showTimes, setShowTimes] = useState();
  const [showTimeSelected, setShowTimeSelected] = useState();

  const handleSelectSeat = (row, column) => {
    if (seatReserved.includes(row + column)) {
      return;
    }

    const seatSelectedCopy = seatSelected;
    if (seatSelected.includes(row + column)) {
      //deseleccionar silla
      setSeatsNumb(seatsNumb - 1);
      const index = seatSelectedCopy.indexOf(row + column);
      if (index > -1) {
        seatSelectedCopy.splice(index, 1);
      }
    } else {
      //agrega silla
      setSeatsNumb(seatsNumb + 1);
      seatSelectedCopy.push(row + column);
    }
    //guarda nuevo array de sillas en el estado
    setSeatSelected(seatSelectedCopy);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const movieResponse = await axios.get(
      `http://localhost:5000/api/movies/${id}`
    );
    const showtimeResponse = await axios.get(
      `http://localhost:5000/api/movieShow/movie/${id}`
    );

    const schedules = [];

    showtimeResponse.data.forEach((showtime) => {
      const startTime = showtime.startTime;
      const dateTime = startTime.split("T");
      const date = dateTime[0];
      const time = dateTime[1];

      let schedule = schedules.find((schedule) => schedule.date === date);
      if (schedule) {
        schedule.time.push(time);
      } else {
        schedule = { date, time: [time] };
        schedules.push(schedule);
      }
    });

    setSchedules(schedules);
    setShowTimes(showtimeResponse.data);
    setMovie(movieResponse.data);
  }, []);

  //
  const handleTimeSelected = async (timeSelected) => {
    const showtimeSelected = showTimes.find((showtime) => {
      const dateTime = dateSelected + "T" + timeSelected;
      return showtime.startTime === dateTime;
    });
    setShowTimeSelected(showtimeSelected);

    // obtener datos de las sillas reservadas
    const seatReservedResponse = await axios.get(
      `http://localhost:5000/api/seat/movieshow/${showtimeSelected._id}`
    );

    setSeatReserved(seatReservedResponse.data);
    setSeatsNumb(0);
    setTimeSelected(timeSelected);
  };

  const handleReservation = async (variant) => {
    if (!user) {
      enqueueSnackbar("Si no tienes una cuenta, registrate", {
        variant: "warning",
      });
      return;
    }
    const body = {
      user: user._id,
      movieShow: showTimeSelected._id,
      price: showTimeSelected.cinema.price * seatSelected.length,
      seats: seatSelected,
    };

    const tickets = await axios.post(
      `http://localhost:5000/api/reservation/`,
      body
    );
    //enviar reserva al correo
    const invitations = tickets.data;
    await axios.post(
      `http://localhost:5000/api/email/invitations`,
      invitations
    );
    enqueueSnackbar("Reserva Exitosa", { variant });
    handleDateSelected("");
    setSeatSelected([]);
  };

  const handleDateSelected = (date) => {
    setTimeSelected("");
    setSeatsNumb(0);
    setDateSelected(date);
  };

  return (
    <Page>
      <Container fixed>
        <Grid container spacing={2} sx={{ minheight: "75vh" }}>
          <Container>
            {movie && (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 4 }}>
                <MovieDetailCard
                  image={movie.image}
                  title={movie.title}
                  description={movie.description}></MovieDetailCard>
                <Grid item xs={8}>
                  <Typography gutterBottom variant="h4" component="div">
                    {movie.title} {movie.format}
                  </Typography>

                  <Grid container rowSpacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={4}>
                      <Typography variant="h6">Fechas Disponibles:</Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <ButtonGroup size="large" aria-label="large button group">
                        {schedules.map((schedule, i) => (
                          <Button
                            variant={
                              dateSelected === schedule.date
                                ? "contained"
                                : "outlined"
                            }
                            key={i}
                            onClick={() => handleDateSelected(schedule.date)}>
                            {schedule.date}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Grid>

                    {dateSelected !== "" && (
                      <>
                        <Grid item xs={4}>
                          <Typography variant="h6">Horas:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <ButtonGroup
                            size="large"
                            aria-label="large button group">
                            {schedules
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
                          handleSelectSeat={handleSelectSeat}
                          seatReserved={seatReserved}></Seats>
                      </Grid>
                    )}

                    {seatsNumb > 0 && (
                      <Grid item xs={12} sx={{}}>
                        <Card>
                          <CardContent
                            sx={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              backgroundColor: "error.main",
                              alignItems: "center",
                            }}>
                            <Typography variant="h5" color="error.contrastText">
                              Cantidad de Sillas:{seatsNumb}
                            </Typography>
                            <Typography variant="h5" color="error.contrastText">
                              Precio:${seatsNumb * 20000}
                            </Typography>
                            {user ? (
                              <DialogLS
                                callbackOnYes={() =>
                                  handleReservation("success")
                                }
                                textbtn="Reservar"
                                dialogmsg="¿Estas seguro de realizar la reserva?"></DialogLS>
                            ) : (
                              <>
                                <Button
                                  color="primary"
                                  variant="contained"
                                  onClick={(e) => handleReservation("success")}>
                                  Reserva
                                </Button>
                              </>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Container>
        </Grid>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return { user: state.login?.user };
};

export default connect(mapStateToProps, null)(MovieDetails);
