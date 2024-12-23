"use client";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Grid,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PetsIcon from "@mui/icons-material/Pets";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AnimalModalEdit from "@/components/AnimalModalEdit";
import Carousel from "react-material-ui-carousel";
import { firestore } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const AnimalDetail = () => {
  const { petId } = useParams<{ petId: string }>();
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEditModalOpen = () => setOpenEdit(true);
  const handleEditModalClose = () => setOpenEdit(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = React.useState<any | null>(null);
  const userId = useSelector((state: RootState) => state.user.user.id);

  // Consulta a Firestore para obtener el documento del usuario
  React.useEffect(() => {
    const fetchUserDoc = async () => {
      if (!userId) return; // Verifica si tienes el userId
      try {
        const userRef = doc(firestore, "users", userId); // Consulta al documento de usuarios
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          // Si el documento existe, lo almacenamos en el estado
          setUserDoc(docSnap.data());
          console.log("Documento del usuario: ", docSnap.data());
        } else {
          console.log("No se encontró el documento del usuario.");
        }
      } catch (error) {
        console.error("Error al obtener el documento del usuario: ", error);
      }
    };

    fetchUserDoc();
  }, [userId]);
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

  const currentId = parseInt(petId);
  const animal = reports.find((a) => parseInt(a.id) === currentId);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Cargando datos de la mascota...
        </Typography>
      </Box>
    );
  }

  if (!animal) {
    return (
      <Box textAlign="center" p={5}>
        <Typography variant="h4">Animal no encontrado</Typography>
      </Box>
    );
  }


  return (
    <>
      {/* Botón de regresar */}
      <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 100 }}>
        <Link href="/" passHref>
          <IconButton
            color="primary"
            sx={{
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.1)", color: "#5c6bc0" },
            }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Link>
      </Box>

      <Card
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          boxShadow: 5,
          borderRadius: 3,
          p: 10,
          paddingLeft: 20,
          position: "relative",
          backgroundImage: {
            md: "url('/assets/pawsWithoutPets.svg')",
          },
          backgroundSize: "fill",
          backgroundPosition: { xs: "right", sm: "center", md: "top" },
          backgroundRepeat: "repeat",
        }}
      >
        {/* Carousel */}
        <Box
          sx={{
            position: "absolute",
            left: "40%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 1000,
            height: "auto",
            zIndex: 1,
            mb: 2,
          }}
        >
          <Carousel
            animation="fade"
            interval={3000}
            indicators={true}
            autoPlay={true}
          >
            {animal?.images?.map((img: string, index: number) => (
              <Tooltip
                key={index}
                title={`¡Hola!, Soy ${animal.petName} 🐾`}
                placement="top"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      maxWidth: 1000,
                      fontSize: "2rem",
                      backgroundColor: "var(--title-color)",
                      color: "#fff",
                      boxShadow: 3,
                      mb: 2,
                      mt: 2,
                    },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${img}`}
                  alt={`Imagen ${index + 1}`}
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                    aspectRatio: "16/9",
                    borderRadius: 2,
                  }}
                />
              </Tooltip>
            ))}
          </Carousel>
        </Box>
        <CardContent sx={{ flex: "1", p: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h1"
                fontWeight="bold"
                color="primary"
                gutterBottom
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                  mb: 0,
                }}
              >
                {animal.petName}
                <PetsIcon sx={{ fontSize: "5rem" }} />
              </Typography>
              {/* Botón de editar animal.petId cambia al uid del usuario que coincida con el report. */}
              {userDoc?.pets?.some((pet: any) => pet === petId) ? (
                <Box
                  onClick={handleEditModalOpen}
                  sx={{
                    paddingLeft: 2,
                  }}
                >
                  <IconButton
                    color="secondary"
                    sx={{
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "rotate(10deg)",
                        color: "#ab47bc",
                      },
                    }}
                  >
                    <EditIcon sx={{ fontSize: "4rem" }} />
                  </IconButton>
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <Chip
                label={animal.status}
                color={
                  animal.status == "Sin hogar"
                    ? "error"
                    : animal.status == "Encontrado"
                    ? "success"
                    : "warning"
                }
                sx={{ fontSize: "1.5rem", fontWeight: "bold", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  width: 500,
                  height: "auto",
                  overflow: "auto",
                  textAlign: "justify",
                  hyphens: "auto",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  mb: 2,
                  mt: 2,
                  lineHeight: "1.5",
                  fontSize: "1.3rem",
                }}
              >
                {animal.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 2,
                  mt: 2,
                  lineHeight: "1.5",
                  fontSize: "1.3rem",
                }}
              >
                <LocationOnIcon color="primary" fontSize="large" />{" "}
                <strong>{animal.foundLocation}</strong>
                <Divider sx={{ mb: 2, width: 300, height: 5 }} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  mt: 2,
                  lineHeight: "1.5",
                  fontSize: "1.3rem",
                }}
              >
                <PhoneIcon color="primary" fontSize="large" />{" "}
                <strong>{animal.phone}</strong>
                <Divider sx={{ mb: 2, width: 300, height: 5 }} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  mt: 2,
                  lineHeight: "1.5",
                  fontSize: "1.3rem",
                }}
              >
                <PetsIcon color="primary" fontSize="large" />{" "}
                <strong>{animal.petType}</strong>
                <Divider sx={{ mb: 2, width: 300, height: 5 }} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  mt: 2,
                  lineHeight: "1",
                  fontSize: "1.2rem",
                }}
              >
                <DateRangeIcon color="primary" fontSize="large" />{" "}
                <strong>{animal.dateCreationReport}</strong>
                <Divider sx={{ mb: 2, width: 300, height: 5 }} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  boxShadow: 3,
                  transition: "all 0.3s",
                  "&:hover": { boxShadow: 5, transform: "scale(1.05)" },
                }}
              >
                Contactar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Modal para editar animal */}
      {openEdit && (
        <AnimalModalEdit
          userPets={userDoc.pets}
          animal={animal}
          open={openEdit}
          onClose={handleEditModalClose}
        />
      )}
    </>
  );
};

export default AnimalDetail;
