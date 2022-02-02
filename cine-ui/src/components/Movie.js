import React from "react";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import img2 from "../img/ghostbusters.jpg";
import img3 from "../img/spiderman.png";

const Movie = () => {
  const images = [img2, img3];
  return (
    <Carousel>
      {images.map((img, i) => (
        <Box
          sx={{
            height: "75vh",
            width: "100%",
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "black",
          }}></Box>
      ))}
    </Carousel>
  );
};

export default Movie;
