import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        textAlign: "center",
        color: "white",
        backgroundColor: (theme) => theme.palette.primary.main,
      }}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="primary.contrastText">
          {"Copyright © Cidenet Pictures"} {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
