import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Page from "../components/Page";
import { Container, Button } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useHistory } from "react-router";

const ReservationLists = ({ user }) => {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:5000/api/reservation/user/${user._id}`
    );

    await Promise.all(
      response.data.map(async (reservation) => {
        const tickets = await axios(
          `http://localhost:5000/api/ticket/reservation/${reservation._id}`
        );
        reservation.sillas = tickets.data.map((ticket) => ticket.seat.number);
        reservation.cantidad = reservation.sillas.length;
        reservation.id = reservation._id;
        reservation.pelicula = reservation.movieShow?.movie?.title;
        reservation.fecha = reservation.movieShow?.startTime.split("T")[0];
        reservation.hora = reservation.movieShow?.startTime.split("T")[1];
      })
    );
    setReservations(response.data);
    console.log(response.data);
  }, []);

  const handleRedirect = (e, id) => {
    e.preventDefault();
    history.push(`/verreserva/${id}`);
  };
  const { data } = {
    dataSet: "sillas",
    rowLength: 7,
    maxColumns: 5,
  };
  const [pageSize, setPageSize] = React.useState(7);

  return (
    <Page>
      <Container fixed>
        <DataGridPro
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
          {...data}
          columns={[
            { field: "pelicula", width: 300 },
            { field: "fecha", width: 100 },
            { field: "hora", width: 100 },
            { field: "sillas", width: 100 },
            { field: "cantidad", width: 100 },
            {
              field: "actions",
              type: "actions",
              width: 200,
              cellClassName: "actions",
              getActions: ({ id }) => {
                const isCancelable =
                  reservations?.filter((item) => item.id === id)[0]?.status ===
                  "pending";

                const isCanceled =
                  reservations?.filter((item) => item.id === id)[0]?.sillas
                    .length === 0;

                if (!isCancelable || isCanceled) {
                  return [
                    <Button variant="text" disabled>
                      Reserva Cancelada
                    </Button>,
                  ];
                }

                return [
                  <Button
                    variant="contained"
                    onClick={(e) => handleRedirect(e, id)}>
                    Modificar Reserva
                  </Button>,
                ];
              },
            },
          ]}
          rows={reservations}
        />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return { user: state.login?.user };
};

export default connect(mapStateToProps)(ReservationLists);
