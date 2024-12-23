"use client";

import { CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Mission() {
  return (
    <Box
      id="mission"
      sx={{
        width: "100%",
        height: { xs: "100%", md: "100%" },
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        padding: {
          xs: "0 1em 0",
          sm: "0 6em 0",
          md: "0 7.5em 0",
          lg: "0 15em 0",
        },
      }}
    >
      <Box
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "var(--title-color)",
            marginBottom: 2,
            fontSize: { xs: "1.5em", sm: "2.5em" },
            fontWeight: "bold",
            maxWidth: { xs: "100%", md: "80%" },
          }}
        >
          Transformando el cuidado animal
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--text-color)",
            fontSize: { xs: "1em", sm: "1.25em" },
            maxWidth: { xs: "100%", md: "80%" },
          }}
        >
          En VetPet creemos que cada animal merece una oportunidad de vivir en
          un entorno seguro y amoroso. Nuestra app conecta personas con recursos
          y herramientas que ayudan a proteger y mejorar la vida de los animales
          en su comunidad.
        </Typography>
      </Box>
      <Box
        sx={{
          flexBasis: { xs: "100%", md: "50%" },
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          alt="Imagen de fondo"
          height="100%"
          image="/assets/mission.svg"
          sx={{
            objectFit: "cover",
            borderRadius: "8px",
            width: "100%",
            maxHeight: "100%",
          }}
        />
      </Box>
    </Box>
  );
}
