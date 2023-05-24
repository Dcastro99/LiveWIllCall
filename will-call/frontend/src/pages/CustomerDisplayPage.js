import React from "react";
import { Box } from "@mui/material";
import Display from "../components/Display";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CustomerDisplayPage() {
  return (
    <Box
      sx={{ width: "100vw" }}
    >
      <Header />
      <Display />
      <Footer />
    </Box>
  );
}
