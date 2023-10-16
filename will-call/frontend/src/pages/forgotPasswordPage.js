import React from "react";
import { Box } from "@mui/material";
import InputForm from "../components/ForgotPassword/forgotPassword";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CustomerInputPage() {
  return (
    <Box>
      <Header />
      
      <InputForm />
      <Footer />
    </Box>
  );
}