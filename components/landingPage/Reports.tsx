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
import { collection, getDocs } from "firebase/firestore";
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

interface FormDataReport {
  id: number;
  reportType: "lost" | "found";
  reporterName: string; // Nombre del reportante
  phone: string; // Número de teléfono del reportante
  petType: string; // Tipo de mascota
  petName?: string; // Nombre de la mascota (para "perdido")
  foundLocation?: string; // Lugar encontrado
  description: string;
  age?: string; // Edad aproximada (solo para "perdido")
  status?: string; // Estado: Sin hogar, Perdido, etc.
  images: string[];
  reward?: string; //Solo para "perdido"
  dateCreationReport: string; // Fecha de creación del reporte
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

  const getAllReports = async () => {
    try {
      // Referencia a la colección "reports"
      const reportsRef = collection(firestore, "reports");

      // Obtener todos los documentos
      const querySnapshot = await getDocs(reportsRef);

      // Convertir los documentos a un array de objetos
      const reports = querySnapshot.docs.map((doc) => ({
        ...doc.data(), // Expandir todos los campos del documento
      }));

      reports.sort((a, b) => {
        // Asumiendo que dateCreationReport es un string con formato ISO 8601
        return (
          new Date(b.dateCreationReport).getTime() -
          new Date(a.dateCreationReport).getTime()
        );
      });

      console.log(reports);
      return reports;
    } catch (error) {
      console.error("Error al obtener los reportes:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getAllReports();
        setReports(data);
      } catch (err) {
        console.error("Error al cargar los reportes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
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
