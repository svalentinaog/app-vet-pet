"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AnimalCard from "../AnimalCard";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { collection, getDocs, onSnapshot  } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

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
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  const getReportsRealTime = () => {
    const reportsRef = collection(firestore, "reports");

    // Usamos onSnapshot para escuchar los cambios en la colección
    onSnapshot(reportsRef, (querySnapshot) => {
      const reportsList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      // Ordenar los reportes por fecha de creación (más recientes primero)
      reportsList.sort((a, b) => {
        return new Date(b.dateCreationReport).getTime() - new Date(a.dateCreationReport).getTime();
      });

      setReports(reportsList);
      setLoading(false); // Ya no está cargando
    });
  };

  
  useEffect(() => {
    // Obtener los reportes en tiempo real
    getReportsRealTime();
  }, []);

  
  // Obtener los animales de la página actual
  const startIndex = (currentPage - 1) * animalsPerPage;
  const endIndex = startIndex + animalsPerPage;
  const animalsToShow = reports.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Ocupa toda la altura de la ventana
        }}
      >
        <CircularProgress sx={{ color: "var(--primary-color)" }} />
      </Box>
    );
  }

  // Si no hay reportes, mostrar mensaje
  if (reports.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
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
            marginBottom: "2em",
            fontSize: { xs: "1.5em", sm: "2.5em" },
            fontWeight: "bold",
          }}
        >
          No hay reportes de mascotas disponibles
        </Typography>
      </Box>
    );
  }

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
          count={Math.ceil(reports.length / animalsPerPage)}
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
            padding: 0,
            borderRadius: "100px",
            "&:hover": {
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
