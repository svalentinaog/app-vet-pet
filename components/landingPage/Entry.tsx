"use client";

import { MainButton } from "@/styles/mui";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Entry() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--gradient-round)",
        height: { xs: "auto", sm: "90vh", md: "90vh" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundImage: {
            xs: "url('/assets/paws-mobile.svg')",
            sm: "url('/assets/paws.svg')",
            md: "url('/assets/paws.svg')",
          },
          backgroundSize: "cover",
          backgroundPosition: { xs: "right", sm: "center", md: "center" },
          backgroundRepeat: "no-repeat",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "3em", sm: "5em", md: "15em" },
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "60%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            gap: 4,
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
                fontSize: { xs: "1.5em", sm: "2em", md: "2.5em" },
              }}
            >
              Bienvenido a VetPet <br />
              ¡Nos encanta tenerte aquí!
            </Typography>
          </Box>
          <MainButton
            sx={{
              maxWidth: { xs: "150px", sm: "300px", md: "300px" },
              fontSize: { xs: "1em", sm: "1.5em" },
            }}
          >
            Ver Amigos
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

export default Entry;