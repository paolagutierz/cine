import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Page from "../components/Page";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardContent,
  Container,
  FormGroup,
  FormControlLabel,
  ButtonGroup,
} from "@mui/material/";
import Checkbox from "@mui/material/Checkbox";
import MovieDetailCard from "../components/MovieDetailCard";
import thematrix from "../img/promo/thematrix.jpg";
import DialogLS from "../components/DialogLS";
import { useSnackbar } from "notistack";

//remover silla
const removeItem = (array, item) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const ReservationDetails = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [reservationSelected, setreservationSelected] = useState("");
  const [seatsRemove, setSeatsRemove] = React.useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/reservation/${id}`
    );
    const reservation = response.data;

    const ticketResponse = await axios.get(
      `http://localhost:5000/api/ticket/reservation/${id}`
    );
    reservation.seats = ticketResponse.data.map((ticket) => {
      return ticket.seat.number;
    });
    setreservationSelected(reservation);
    console.log(response.data);
  };

  //remover sillas
  const handleChange = (e) => {
    const seatsCopy = seatsRemove.slice();
    console.log(seatsRemove);
    if (e.target.checked) {
      seatsCopy.push(e.target.value);
    } else {
      removeItem(seatsCopy, e.target.value);
    }
    setSeatsRemove(seatsCopy);
  };

  const removeSeats = async (isCanceling) => {
    if (isCanceling) {
      try {
        //endpoint para cancelar
        await axios.delete(`http://localhost:5000/api/reservation/${id}`);
        loadData();
        enqueueSnackbar("Cancelacion Exitosa", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("No se pudo cancelar la reserva", {
          variant: "error",
        });
      }
    } else {
      try {
        await axios.put(`http://localhost:5000/api/seat/reservation/${id}`, {
          seats: seatsRemove,
        });
        loadData();
        enqueueSnackbar("Liberacion exitosa", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("No se pudo liberar la silla ", { variant: "error" });
      }
    }
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
              sx={{ mt: 2 }}>
              <MovieDetailCard
                img={thematrix}
                title={
                  reservationSelected?.movieShow?.movie?.title
                }></MovieDetailCard>
              <Grid item xs={6}>
                <CardContent>
                  <Card>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ mt: 4, mx: 4 }}>
                      {reservationSelected?.movieShow?.movie?.title}{" "}
                      {reservationSelected?.movieShow?.movie?.format}
                    </Typography>
                    <Grid container rowSpacing={2} sx={{ mx: 4 }}>
                      <Grid item xs={8}>
                        <Grid
                          item
                          sx={{
                            mt: 3,
                          }}>
                          <Typography
                            sx={{
                              mt: 3,
                            }}>
                            Fecha:{" "}
                            {
                              reservationSelected?.movieShow?.startTime?.split(
                                "T"
                              )[0]
                            }
                          </Typography>
                          <Typography
                            sx={{
                              mt: 3,
                            }}>
                            Hora:{" "}
                            {
                              reservationSelected?.movieShow?.startTime?.split(
                                "T"
                              )[1]
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            mt: 2,
                          }}>
                          {" "}
                          {reservationSelected?.seats?.length > 0
                            ? "Sillas:"
                            : "Reserva Cancelada"}
                        </Typography>
                        <FormGroup
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            mt: 2,
                          }}>
                          {reservationSelected?.seats?.map((seat, i) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  key={seat + i}
                                  value={seat}
                                  className="chkseats"
                                  onChange={handleChange}
                                />
                              }
                              label={seat}
                            />
                          ))}
                        </FormGroup>
                      </Grid>
                      <ButtonGroup
                        sx={{
                          mt: 4,
                          mb: 8,
                        }}>
                        {" "}
                        {reservationSelected?.seats?.length > 0 && (
                          <>
                            <DialogLS
                              callbackOnYes={() => removeSeats(false)}
                              textbtn="Liberar Silla"
                              disabled={seatsRemove.length === 0}
                              dialogmsg="¿Desea liberar las sillas seleccionadas?"></DialogLS>
                            <DialogLS
                              callbackOnYes={() => removeSeats(true)}
                              textbtn="Cancelar Reserva"
                              dialogmsg="¿Desea cancelar la reserva?"></DialogLS>
                          </>
                        )}
                      </ButtonGroup>
                    </Grid>
                  </Card>
                </CardContent>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Container>
    </Page>
  );
};

export default ReservationDetails;
