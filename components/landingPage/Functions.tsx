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
      id="functions"
      sx={{
        width: "100%",
        height: { xs: "100%", md: "70vh"},
        padding: { xs: "5em 1em 0", md: "0 4em 0", sm: "0 6em 0" },
        alignContent: "center",
        background: "var(--gradient-lineal)",
      }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            color: "var(--title-color)",
            marginBottom: { xs: "1.5em", md: "1em", sm: "2em" },
            fontSize: { xs: "1.5em", sm: "2.5em" },
            fontWeight: "bold",
          }}
        >
          Funcionalidades clave
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {elements.map((element, index) => (
          <Grid item key={index} xs={12} sm={4}>
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
                  color: "rgba(0, 0, 0, 0.1)",
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
                  variant="h6"
                  sx={{
                    color: "var(--title-color)",
                    marginBottom: "0.25em",
                    fontWeight: "bold",
                  }}
                >
                  {element.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-color)",
                  }}
                >
                  {element.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
