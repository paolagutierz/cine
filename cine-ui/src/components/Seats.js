import React from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/Box";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const seats = [
  { letter: "A", numbers: [1, 2, 3, 4, 5, 6] },
  { letter: "B", numbers: [1, 2, 3, 4, 5, 6] },
  { letter: "C", numbers: [1, 2, 3, 4, 5, 6] },
  { letter: "D", numbers: [1, 2, 3, 4, 5, 6] },
];

const Seats = ({ seatSelected, handleSelectSeat, seatReserved }) => {
  return (
    <Container
      fixed
      sx={{
        my: 6,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      {
        <Box
          sx={{
            width: 400,
            height: 280,
            backgroundColor: "primary.dark",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Box
            sx={{
              width: 200,
              height: 30,
              backgroundColor: "text.secondary",
              textAlign: "center",
            }}>
            {" "}
            <Typography color="secondary.contrastText">Pantalla</Typography>
            <Grid container rowSpacing={2} sx={{ mt: 2 }}>
              {seats.map((seat, i) =>
                seat.numbers.map((number, i) => (
                  <Grid item xs={2} key={i}>
                    <IconButton
                      size="large"
                      color={
                        seatSelected?.includes(seat.letter + number)
                          ? "error.contrastText"
                          : seatReserved?.includes(seat.letter + number)
                          ? "error"
                          : "warning.main"
                      }
                      disabled={true}
                      onClick={() => handleSelectSeat(seat.letter, number)}>
                      <EventSeatIcon />
                    </IconButton>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>
      }
    </Container>
  );
};

export default Seats;
