import {
  createMovieAction,
  uploadMovieImageAction,
  getMoviesAction,
  onSelectMovieAction,
  getMovieAction,
  addMovieAction,
  updateMovieAction,
  removeMovieAction,
} from "../store/movieActions";
import React from "react";
import Page from "../components/Page";
import { Container, Button } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useHistory } from "react-router";

const dashboardMovie = ({
  createMovieAction,
  uploadMovieImageAction,
  getMoviesAction,
  onSelectMovieAction,
  getMovieAction,
  addMovieAction,
  updateMovieAction,
  removeMovieAction,
}) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setimage] = useState("");
  const [error, setError] = useState(null);

  const handleMovie = async (event) => {
    event.preventDefault();

    createMovieAction();

    const movie = {
      title,
      genre,
      description,
      format,
      duration,
      image,
    };

    try {
      await axios.post("http://localhost:5000/api/movies", user);
      createMovieAction();
      history.push("/movie/:id");
    } catch (error) {
      error();
    }
  };

  return (
    <Page>
      <Container fixed>
        <DataGridPro
          rowCount
          disableSelectionOnClick
          autoPageSize
          columns={[
            { field: "titulo" },
            { field: "genero" },
            { field: "descripcion" },
            { field: "formato" },
            { field: "duracion" },
            { field: "imagen" },
            {
              field: "actions",
              type: "actions",
              headerName: "Actions",
              width: 300,
              cellClassName: "actions",
                }
                  <Button>
                  </Button>,
            
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

export default dashboardMovie;
