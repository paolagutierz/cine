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
      tittle: "Encanto",
      format: "2D",
    },
    {
      img: venom,
      tittle: "Venom",
      format: "2D",
    },
    {
      img: encanto,
      tittle: "Encanto",
      format: "3D",
    },
    {
      img: venom,
      tittle: "Venom",
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
            tittle={listing.tittle}
            format={listing.format}></MovieListing>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieListings;
