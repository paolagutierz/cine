import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

const Page = ({ children }) => {
  return (
    <Container fixed>
      <Navbar id="header"></Navbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "75vh",
        }}>
        {children}
      </Box>
      <Footer></Footer>
    </Container>
  );
};

export default Page;
