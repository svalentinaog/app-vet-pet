"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AnimalCard from "../AnimalCard";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Animal {
  id: number;
  image: string;
  name: string;
  status: string;
  description: string;
  location: string;
  phone: number;
}

export default function Reports() {
  const animals: Animal[] = [
    {
      id: 1,
      image: "/assets/pet1.png",
      name: "Manchas",
      status: "Sin hogar",
      description: "Lorem ipsum...",
      location: "Versalles",
      phone: 3187399367,
    },
    {
      id: 2,
      image: "/assets/pet2.png",
      name: "Lucas",
      status: "Perdido",
      description: "Lorem ipsum...",
      location: "Versalles",
      phone: 3187399367,
    },
    {
      id: 3,
      image: "/assets/cat1.png",
      name: "Carlota",
      status: "Perdido",
      description: "Lorem ipsum...",
      location: "Versalles",
      phone: 3187399367,
    },
    {
      id: 4,
      image: "/assets/cat2.png",
      name: "Jericho",
      status: "Sin hogar",
      description: "Lorem ipsum...",
      location: "Versalles",
      phone: 3187399367,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  // Determinar si el dispositivo es móvil
  const isMobile = useMediaQuery("(max-width:600px)");

  // Determinar el número de animales por página según el tamaño de pantalla
  const animalsPerPage = isMobile ? 1 : 4;

  // Manejador para cambiar de página
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Obtener los animales de la página actual
  const startIndex = (currentPage - 1) * animalsPerPage;
  const endIndex = startIndex + animalsPerPage;
  const animalsToShow = animals.slice(startIndex, endIndex);

  return (
    <Box
      id="reports"
      sx={{
        width: "100%",
        height: "100%",
        alignContent: "center",
        background: "var(--gradient-lineal2)",
        padding: {
          xs: "0 1em 0",
          sm: "0 6em 0",
          md: "0 7.5em 0",
          lg: "0 15em 0",
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "var(--title-color)",
          marginBottom: { xs: "1.5em", sm: "2em" },
          fontSize: { xs: "1.5em", sm: "2.5em" },
          fontWeight: "bold",
        }}
      >
        Reportes más recientes{" "}
      </Typography>
      {/* Grid contenedor para las tarjetas */}
      <Grid container spacing={2}>
        {animalsToShow.map((animal) => (
          <Grid
            item
            key={animal.id}
            // xs={12}
            // sm={6}
            // md={3}
            // lg={3}
            sx={{
              width: { xs: "100%", md: "25%", lg: "25%" },
              display: "flex",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <AnimalCard animal={animal} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          marginTop: 10,
        }}
      >
        {/* Paginado */}
        <Pagination
          count={Math.ceil(animals.length / animalsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              color: "var(--primary-color)",
              borderRadius: "100px",
            },
            "& .MuiPaginationItem-root:hover": {
              color: "var(--light-color)",
              backgroundColor: "rgba(159, 164, 219, 0.7)",
            },
            "& .Mui-selected": {
              backgroundColor: "var(--primary-color) !important",
              color: "white",
            },
          }}
        />
        <Button
          href="/reports"
          sx={{
            color: "var(--title-color)",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
            border: "none",
            padding: 2,
            borderRadius: "100px",
            "&:hover": {
              backgroundColor: "rgba(159, 164, 219, 0.1)",
              textDecoration: "underline",
            },
          }}
        >
          <Typography>Ver todos</Typography>
          <NavigateNextIcon />
        </Button>
      </Box>
    </Box>
  );
}
