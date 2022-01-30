import React, { useState, useEffect } from "react";
import axios from "axios";
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

      apiRef.current.setCellFocus(id, "title");
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Agregar Pelicula
      </Button>
    </GridToolbarContainer>
  );
}

const PanelMovie = ({ user }) => {
  const apiRef = useGridApiRef();
  const { enqueueSnackbar } = useSnackbar();

  //defino el estado para las filas
  const [rows, setRows] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    //llamar endpoint para obtener todas las peliculas
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/movies");
    const movies = response.data.map((movie, i) => {
      return { id: i + 1, ...movie };
    });
    setRows(movies);
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

      const movie = {
        title: newRow.title.value,
        genre: newRow.genre.value,
        format: newRow.format.value,
        description: newRow.description.value,
        duration: newRow.duration.value,
        image: newRow.image.value,
      };

      //validar si es guardado o editado
      const movieId = rows.filter((movie) => movie.id === id)[0]?._id;

      try {
        if (movieId) {
          //si existe el id voy a editar
          await axios.put(
            `http://localhost:5000/api/movies/${movieId}`,
            movie,
            {
              headers: { "x-auth-token": user.accessToken },
            }
          );
        } else {
          // si no existe el id creo la pelicula
          await axios.post("http://localhost:5000/api/movies", movie, {
            headers: { "x-auth-token": user.accessToken },
          });
        }
        loadData();
        //notificacion exitosa
        enqueueSnackbar("Pelicula agregada o modificada exitosamente", {
          variant: "success",
        });
        apiRef.current.setRowMode(id, "view");
        const row = apiRef.current.getRow(id);
        apiRef.current.updateRows([{ ...row, isNew: false }]);
      } catch (err) {
        //notificacion fallida
        enqueueSnackbar("No se pudo crear o modificar la pelicula", {
          variant: "error",
        });
      }
    }
  };

  const handleDeleteClick = (id) => async (event) => {
    event.stopPropagation();
    debugger;
    const movieId = rows.filter((movie) => movie.id === id)[0]?._id;
    if (movieId) {
      try {
        await axios.delete(`http://localhost:5000/api/movies/${movieId}`, {
          headers: { "x-auth-token": user.accessToken },
        });

        enqueueSnackbar("Pelicula eliminada correctamente", {
          variant: "success",
        });
        apiRef.current.updateRows([{ id, _action: "delete" }]);
      } catch (error) {
        enqueueSnackbar("No se pudo eliminar la pelicula", {
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
    { field: "title", headerName: "Titulo", width: 180, editable: true },
    {
      field: "format",
      type: "singleSelect",
      headerName: "Formato",
      editable: true,
      width: 100,
      valueOptions: ["2D", "3D"],
    },
    {
      field: "genre",
      headerName: "Genero",
      editable: true,
      type: "singleSelect",
      width: 150,
      valueOptions: [
        "Acción",
        "Aventura",
        "Ciencia Ficción",
        "Fantasía",
        "Terror",
        "Drama",
        "Supenso",
        "Comedia",
        "Animacion",
      ],
    },
    {
      field: "description",
      headerName: "Descripcion",
      width: 220,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duracion",
      width: 100,
      editable: true,
    },
    {
      field: "image",
      headerName: "Poster",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Editar/Eliminar",
      width: 200,
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

export default PanelMovie;
