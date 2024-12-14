"use client";

import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RoomIcon from "@mui/icons-material/Room";

export default function Functions() {
  const elements = [
    {
      icon: <PetsIcon fontSize="large" />,
      title: "Reportar animales",
      description:
        "Reporta animales en riesgo, extraviados, abandonados o en estado de emergencia para ayudar a protegerlos.",
      bgcolor: "#CBEDDA",
    },
    {
      icon: <MedicalServicesIcon fontSize="large" />,
      title: "Consultas médicas",
      description:
        "Ofrecemos un sistema de consultas basado en inteligencia artificial para guiarte en el cuidado de tus mascotas.",
      bgcolor: "#FBEEC0",
    },
    {
      icon: <RoomIcon fontSize="large" />,
      title: "Mapa de localización",
      description:
        "Encuentra refugios y veterinarias cercanas para atender emergencias de manera rápida y eficaz.",
      bgcolor: "#F5E1F5",
    },
  ];

  return (
    <Box
      sx={{
        height: "70vh",
        alignContent: "center",
        background: "var(--gradient-lineal)",
      }}
      id="functions"
    >
      <Container maxWidth="xl">
        <Box>
          <Typography
            variant="h3"
            sx={{ color: "var(--title-color)", marginBottom: "2em" }}
          >
            Funcionalidades clave
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {elements.map((element, index) => (
            <Grid
              item
              key={index}
              xs={12} // Ajustar para pantallas pequeñas
              sm={4} // 3 columnas en pantallas medianas
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: element.bgcolor,
                    color: "white",
                    padding: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20px",
                  }}
                >
                  {element.icon}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "var(--title-color)",
                      marginBottom: "0.25em",
                      fontWeight: "bold",
                    }}
                  >
                    {element.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "var(--text-color)" }}
                  >
                    {element.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
