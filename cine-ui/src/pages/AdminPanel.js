import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PanelMovie from "../components/Admin/PanelMovie";
import PanelShowtime from "../components/Admin/PanelShowtime";
import axios from "axios";

function AdminPanel({ user }) {
  const [value, setValue] = React.useState("1");
  const [movies, setMovies] = React.useState([]);
  const [cinemas, setCinemas] = React.useState([]);

  useEffect(async () => {
    await getMovies();
    await getCinemas();
  }, []);

  const getMovies = async () => {
    //llamar endpoint para obetener peliculas
    const response = await axios.get("http://localhost:5000/api/movies");
    const movies = response.data.map((movieObj) => {
      return {
        id: movieObj._id,
        title: movieObj.title,
        duration: movieObj.duration,
      };
    });
    setMovies(movies);
  };

  const getCinemas = async () => {
    //llamar endpoint para obetener peliculas
    const response = await axios.get("http://localhost:5000/api/cinemas");
    const cinemas = response.data.map((cinemaObj) => cinemaObj.number);
    setCinemas(cinemas);
  };

  const handleChange = async (event, newValue) => {
    await getMovies();
    setValue(newValue);
  };

  return (
    <Page>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Pelicula" value="1" />
              <Tab label="Horarios" value="2" />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: "0px" }} value="1">
            <PanelMovie user={user} />
          </TabPanel>
          <TabPanel sx={{ padding: "0px" }} value="2">
            {" "}
            <PanelShowtime user={user} movies={movies} cinemas={cinemas} />
          </TabPanel>
        </TabContext>
      </Box>
    </Page>
  );
}

export default AdminPanel;
