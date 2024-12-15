"use client";

import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AnimalCard from "../AnimalCard";
import { useState } from "react";

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
        height: { xs: "100%", md: "100vh" },
        alignContent: "center",
        background: "var(--gradient-lineal2)",
      }}
    >
      <Container maxWidth="xl">
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
          {/* Tarjetas de animales */}
          {animalsToShow.map((animal) => (
            <Grid item xs={12} sm={6} md={3} key={animal.id}>
              <AnimalCard animal={animal} />
            </Grid>
          ))}
        </Grid>

        {/* Paginado */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Pagination
            count={Math.ceil(animals.length / animalsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Box>
      </Container>
    </Box>
  );
}
