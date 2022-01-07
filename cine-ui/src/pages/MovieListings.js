import React from "react";
import encanto from "../img/promo/encanto2.jpg";
import venom from "../img/promo/venom.png";
import Grid from "@mui/material/Grid";
import MovieListing from "../components/MovieListing";
import { Container } from "@mui/material";

const MovieListings = () => {
  const listings = [
    {
      img: encanto,
      title: "Encanto",
      format: "2D",
    },
    {
      img: venom,
      title: "Venom",
      format: "2D",
    },
    {
      img: encanto,
      title: "Encanto",
      format: "3D",
    },
    {
      img: venom,
      title: "Venom",
      format: "2D",
    },
  ];

  return (
    <Container fixed>
      <Grid container spacing={2} sx={{ minheight: "75vh" }}>
        {listings.map((listing, i) => (
          <MovieListing
            key={i}
            img={listing.img}
            title={listing.title}
            format={listing.format}></MovieListing>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieListings;
