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
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PetsIcon from "@mui/icons-material/Pets";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import AnimalModalEdit from "@/components/AnimalModalEdit";
import Carousel from "react-material-ui-carousel";
import { FormDataReport } from "../../../interfaces/typesReport";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { width } from "@mui/system";

const AnimalDetail = () => {
  const { petId } = useParams<{ petId: string }>();
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEditModalOpen = () => setOpenEdit(true);
  const handleEditModalClose = () => setOpenEdit(false);

  const animals: FormDataReport[] = [
    {
      petId: 1,
      reportType: "lost",
      reporterName: "Ana Martinez",
      phone: "3187399367",
      petType: "Perro",
      petName: "Manchas",
      foundLocation: "Versalles",
      description:
        "Perro mediano, manchas blancas y negras, muy amigable y juguetón. Encontrado cerca del parque principal, lleva collar azul sin identificación.",
      status: "Perdido",
      images: [
        "/assets/pet1.png",
        "/assets/pet1-2.png",
        "/assets/pet1-3.png",
        "/assets/pet1-4.png",
      ],
      reward: "200.000",
      dateCreationReport: "2024-12-21",
    },
    {
      petId: 2,
      reportType: "found",
      reporterName: "Carlos Ruiz",
      phone: "3187399367",
      petType: "Perro",
      petName: "Lucas",
      foundLocation: "Versalles",
      description:
        "Perro pequeño color marrón, raza Yorkshire. Perdido en la zona residencial, lleva collar rojo con placa de identificación.",
      age: "3 años",
      status: "Sin hogar",
      images: ["/assets/pet2.png", "/asspets/pet2-2.png"],
      dateCreationReport: "2024-12-20",
    },
    {
      petId: 3,
      reportType: "lost",
      reporterName: "María José López",
      phone: "3187399367",
      petType: "Gato",
      petName: "Carlota",
      foundLocation: "Versalles",
      description:
        "Gata siamesa de ojos azules, muy tímida. Se perdió cerca del centro comercial, tiene un collar negro con cascabel.",
      age: "2 años",
      status: "Perdido",
      images: ["/assets/cat1.png", "/assets/cat1-2.png"],
      reward: "200.000",
      dateCreationReport: "2024-12-19",
    },
    {
      petId: 4,
      reportType: "found",
      reporterName: "Diego Sánchez",
      phone: "3187399367",
      petType: "Gato",
      petName: "Jericho",
      foundLocation: "Versalles",
      description:
        "Gato naranja con rayas, muy cariñoso. Encontrado deambulando por la zona comercial, sin collar ni identificación.",
      status: "Sin hogar",
      images: ["/assets/cat2.png", "/assets/cat2-2.png"],
      dateCreationReport: "2024-12-18",
    },
  ];

  const currentId = parseInt(petId);
  const animal = animals.find((a) => a.petId === currentId);
  const previousAnimal = animals.find((a) => a.petId === currentId - 1);
  const nextAnimal = animals.find((a) => a.petId === currentId + 1);

  if (!animal) {
    return (
      <Box textAlign="center" p={5}>
        <Typography variant="h3">Animal no encontrado</Typography>
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

      {/* Flechas de navegación */}
      {previousAnimal && (
        <Box
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
          }}
        >
          <Link href={`/animal-detail/${previousAnimal.petId}`} passHref>
            <IconButton color="primary" aria-label="previous animal">
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>
          </Link>
        </Box>
      )}
      {nextAnimal && (
        <Box
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
          }}
        >
          <Link href={`/animal-detail/${nextAnimal.petId}`} passHref>
            <IconButton color="primary" aria-label="next animal">
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>
          </Link>
        </Box>
      )}

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
            left: "35%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 1200,
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
            {animal.images?.map((img, index) => (
              <Tooltip
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
                  key={index}
                  component="img"
                  image={img}
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
              {animal.petId == 1 ? (
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
                <PetsIcon color="primary" fontSize="large" /> <strong>{animal.petType}</strong>
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
                <DateRangeIcon color="primary" fontSize="large"/>{" "}
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
          animal={animal}
          open={openEdit}
          onClose={handleEditModalClose}
        />
      )}
    </>
  );
};

export default AnimalDetail;
