"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    primary: {
      main: "#636db9",
    },
    secondary: {
      main: "#ECA563",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#636db9",
      secondary: "#767676",
    },
  },
});
