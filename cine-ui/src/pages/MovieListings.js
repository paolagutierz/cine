import React from "react";
import Page from "../components/Page";
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
      description:
        "ENCANTO cuenta la historia de los Madrigal una familia extraordinaria que vive escondida en las montañas de Colombia, en una casa mágica, en un pueblo vibrante, en un lugar maravilloso conocido como un Encanto. La magia de este Encanto ha bendecido a todos los niños y niñas de la familia con un don único, desde súper fuerza hasta el poder de sanar. A todos, excepto a Mirabel. Pero cuando descubre que la magia que rodea al Encanto corre peligro, Mirabel decide que ella, la única Madrigal sin poderes mágicos, podría ser la última esperanza de su excepcional familia.",
    },
    {
      img: venom,
      tittle: "Venom",
      format: "2D",
      description:
        "Eddie y Venom están luchando por coexistir cuando el simbionte más grande y malo se une con Cletus Kasady, un asesino en serie psicótico, desatando Carnage. Tom Hardy regresa a la pantalla grande como el protector letal Venom, uno de los personajes más grandes y complejos de MARVEL.",
    },
    {
      img: encanto,
      tittle: "Encanto",
      format: "3D",
      description:
        "ENCANTO cuenta la historia de los Madrigal una familia extraordinaria que vive escondida en las montañas de Colombia, en una casa mágica, en un pueblo vibrante, en un lugar maravilloso conocido como un Encanto. La magia de este Encanto ha bendecido a todos los niños y niñas de la familia con un don único, desde súper fuerza hasta el poder de sanar. A todos, excepto a Mirabel. Pero cuando descubre que la magia que rodea al Encanto corre peligro, Mirabel decide que ella, la única Madrigal sin poderes mágicos, podría ser la última esperanza de su excepcional familia.",
    },
    {
      img: venom,
      tittle: "Venom",
      format: "2D",
      description:
        "Eddie y Venom están luchando por coexistir cuando el simbionte más grande y malo se une con Cletus Kasady, un asesino en serie psicótico, desatando Carnage. Tom Hardy regresa a la pantalla grande como el protector letal Venom, uno de los personajes más grandes y complejos de MARVEL.",
    },
  ];

  return (
    <Page>
      <Container fixed>
        <Grid container spacing={2} sx={{ minheight: "75vh" }}>
          {listings.map((listing, i) => (
            <MovieListing
              key={i}
              img={listing.img}
              tittle={listing.tittle}
              format={listing.format}
              description={listing.description}></MovieListing>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default MovieListings;
