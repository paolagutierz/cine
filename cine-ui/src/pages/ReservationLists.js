import React from "react";
import Page from "../components/Page";
import { Container, Button } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useHistory } from "react-router";

const reservations = [
  {
    id: 1,
    movie: "titulo",
    date: "fecha",
    time: "hora",
    seats: "id sillas",
    quantity: "cantidad",
    isCancelable: true,
  },
  {
    id: 2,
    movie: "titulo2",
    date: "fecha2",
    time: "hora2",
    seats: "id sillas2",
    quantity: "cantidad2",
    isCancelable: true,
  },
];

const ReservationLists = () => {
  const history = useHistory();

  const handleRedirect = (e, id) => {
    e.preventDefault();
    history.push(`/verreserva/${id}`);
  };

  return (
    <Page>
      <Container fixed>
        <DataGridPro
          rowCount
          disableSelectionOnClick
          autoPageSize
          columns={[
            { field: "movie" },
            { field: "date" },
            { field: "time" },
            { field: "seats" },
            { field: "quantity" },
            {
              field: "actions",
              type: "actions",
              headerName: "Actions",
              width: 300,
              cellClassName: "actions",
              getActions: ({ id }) => {
                const isCancelable = reservations.filter(
                  (item) => item.id === id
                )[0].isCancelable;

                if (!isCancelable) {
                  return [];
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
          editMode="row"
        />
      </Container>
    </Page>
  );
};

export default ReservationLists;
