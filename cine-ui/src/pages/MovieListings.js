import React, { useEffect, useState } from "react";
import encanto from "../img/promo/encanto2.jpg";
import venom from "../img/promo/venom.png";
import Grid from "@mui/material/Grid";
import MovieListing from "../components/MovieListing";
import { Container } from "@mui/material";
import axios from "axios";

const MovieListings = () => {
  const [listings, setListings] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.get("movies");

    setListings(response.data);
  }, []);

  return (
    <Container fixed>
      <Grid container spacing={2} sx={{ minheight: "75vh" }}>
        {listings.map((listing, i) => (
          <MovieListing
            key={i}
            img={i % 2 ? encanto : venom}
            title={listing.title}
            format={listing.format}
            description={listing.description}
            id={listing._id}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default MovieListings;
