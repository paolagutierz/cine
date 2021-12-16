import React from "react";
import Page from "../components/Page";
import { Container, Button } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useHistory } from "react-router";

const reservations = [
  {
    id: 1,
    pelicula: "titulo",
    fecha: "fecha",
    hora: "hora",
    sillas: "id sillas",
    cantidad: "cantidad",
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
            { field: "pelicula" },
            { field: "fecha" },
            { field: "hora" },
            { field: "sillas" },
            { field: "cantidad" },
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
