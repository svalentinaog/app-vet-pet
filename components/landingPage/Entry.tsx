"use client";

import { MainButton } from "@/styles/mui";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Entry() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--gradient-round)",
        height: { xs: "50vh", md: "90vh", sm: "90vh" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundImage: {
            xs: "url('/assets/paws-mobile.svg')",
            md: "url('/assets/paws.svg')",
          },
          backgroundSize: "cover",
          backgroundPosition: { xs: "right", sm: "center", md: "center" },
          backgroundRepeat: "no-repeat",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: {
            xs: "2em 1em 0",
            sm: "0 6em 0",
            md: "0 8em 0",
            lg: "0 15em 0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 4 },
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                lineHeight: "1.5em",
                fontWeight: "bold",
                color: "var(--light-color)",
                fontSize: { xs: "1.5em", sm: "2em", md: "3em" },
                width: { xs: "90%", md: "80%", sm: "70%" },
              }}
            >
              Bienvenido a VetPet ¡Nos encanta tenerte aquí!
            </Typography>
          </Box>
          <MainButton
            href="#functions"
            sx={{
              maxWidth: { xs: "150px", sm: "300px", md: "300px" },
              fontSize: { xs: "1em", sm: "1.5em" },
            }}
          >
            Conoce más
          </MainButton>
        </Box>

        <Box
          sx={{
            width: { xs: "0", sm: "50%" },
            display: { xs: "none", sm: "block" },
          }}
        >
          {/* Espacio vacío para division */}
        </Box>
      </Box>
    </Box>
  );
}
