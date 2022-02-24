import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  useGridApiRef,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import { useSnackbar } from "notistack";

//moment().tz("America/Bogota").format();

function EditToolbar(props) {
  const { apiRef } = props;

  const handleClick = () => {
    const id = apiRef.current.getRowsCount() + 1;
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, "edit");
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });

      apiRef.current.setCellFocus(id, "cinemaNumber");
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Agregar Funcion
      </Button>
    </GridToolbarContainer>
  );
}

const PanelShowtime = ({ user, movies, cinemas }) => {
  const apiRef = useGridApiRef();
  const { enqueueSnackbar } = useSnackbar();

  //defino el estado para las filas
  const [rows, setRows] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    //llamar endpoint para obtener todas las funciones
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios.get(`http://localhost:5000/api/movieShow`);
    const movieShows = response.data.map((movieShow, i) => {
      return {
        id: i + 1,
        cinemaNumber: movieShow.cinema.number,
        ...movieShow,
        movie: movieShow.movie.title,
      };
    });
    setRows(movieShows);
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellFocusOut = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, "edit");
  };

  const handleSaveClick = (id) => async (event) => {
    event.stopPropagation();

    const isValid = await apiRef.current.commitRowChange(id);
    if (isValid) {
      const model = apiRef.current.getEditRowsModel();
      const newRow = model[id];

      const { duration, id: movieId } = movies.filter(
        (movie) => movie.title === newRow.movie.value
      )[0];

      const endTimeDateString = moment(newRow.startTime.value)
        .add(parseInt(duration, 10), "minutes")
        .format("YYYY-MM-DDTHH:mm");

      const movieShow = {
        movie: movieId,
        cinemaNumber: newRow.cinemaNumber.value,
        startTime: moment(newRow.startTime.value).format("YYYY-MM-DDTHH:mm"),
        endTime: endTimeDateString,
      };

      console.log(newRow.startTime.value);
      //validar si es guardado o editado
      const movieShowId = rows.filter((movieShow) => movieShow.id === id)[0]
        ?._id;
      debugger;
      try {
        if (movieShowId) {
          //si existe el id voy a editar
          await axios.put(
            `http://localhost:5000/api/movieShow/${movieShowId}`,
            movieShow,
            {
              headers: { "x-auth-token": user.accessToken },
            }
          );
        } else {
          // si no existe el id creo la funcion
          await axios.post("http://localhost:5000/api/movieShow", movieShow, {
            headers: { "x-auth-token": user.accessToken },
          });
        }
        loadData();
        //notificacion exitosa
        enqueueSnackbar("Funcion agregada o modificada exitosamente", {
          variant: "success",
        });
        apiRef.current.setRowMode(id, "view");
        const row = apiRef.current.getRow(id);
        apiRef.current.updateRows([{ ...row, isNew: false }]);
      } catch (err) {
        //notificacion fallida
        enqueueSnackbar("No se pudo crear o modificar la funcion", {
          variant: "error",
        });
      }
    }
  };

  const handleDeleteClick = (id) => async (event) => {
    event.stopPropagation();
    debugger;
    const movieShowId = rows.filter((movieShow) => movieShow.id === id)[0]?._id;
    if (movieShowId) {
      try {
        await axios.delete(
          `http://localhost:5000/api/movieShow/${movieShowId}`,
          {
            headers: { "x-auth-token": user.accessToken },
          }
        );

        enqueueSnackbar("Funcion eliminada correctamente", {
          variant: "success",
        });
        apiRef.current.updateRows([{ id, _action: "delete" }]);
      } catch (error) {
        enqueueSnackbar("No se pudo eliminar la Funcion", {
          variant: "error",
        });
      }
    }
    //llama al endpoint

    //y si es exitoso continua la ejecucion y muestra alerta

    //si falla no continuo y muestro alerta
  };

  const handleCancelClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.setRowMode(id, "view");

    const row = apiRef.current.getRow(id);
    if (row.isNew) {
      apiRef.current.updateRows([{ id, _action: "delete" }]);
    }
  };

  const columns = [
    {
      field: "movie",
      headerName: "Pelicula",
      editable: true,
      width: 200,
      type: "singleSelect",
      valueOptions: movies.map((movie) => movie.title),
    },
    {
      field: "cinemaNumber",
      headerName: "Cinema",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: cinemas,
    },

    {
      field: "startTime",
      headerName: "Fecha y Hora de Inicio",
      type: "dateTime",
      editable: true,
      width: 220,
    },
    {
      field: "endTime",
      headerName: "Fecha y Hora de Finalizacion",
      type: "dateTime",
      editable: false,
      width: 220,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Editar/Eliminar",
      width: 180,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = apiRef.current.getRowMode(id) === "edit";

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onCellFocusOut={handleCellFocusOut}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}
      />
    </Box>
  );
};

export default PanelShowtime;
