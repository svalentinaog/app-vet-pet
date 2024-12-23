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

interface Animal {
  id: number;
  image: string;
  name: string;
  status: string;
  description: string;
  location: string;
  phone: number;
  images?: string[];
}

const AnimalDetail = () => {
  const { petId } = useParams<{ petId: string }>();
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEditModalOpen = () => setOpenEdit(true);
  const handleEditModalClose = () => setOpenEdit(false);

  const animals: Animal[] = [
    {
      id: 1,
      image: "/assets/pet1.png",
      name: "Manchas",
      status: "Sin hogar",
      description:
        "Lorem Ipsum  is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lore Lorem Ipsum is Lorem Ipsum is Lore",
      location: "Versalles",
      phone: 3187399367,
      images: [
        "/assets/pet1-2.png",
        "/assets/pet1-3.png",
        "/assets/pet1-4.png",
      ],
    },
    {
      id: 2,
      image: "/assets/pet2.png",
      name: "Lucas",
      status: "Perdido",
      description: "Lorem ipsum...",
      location: "Versalles",
      phone: 3187399367,
      images: ["/assets/pet2.png", "/assets/pet2-2.png"],
    },
    {
      id: 3,
      image: "/assets/cat1.png",
      name: "Carlota",
      status: "Perdido",
      description: "Lorem ipsum...",
      location: "Versalles",
      phone: 3187399367,
      images: ["/assets/cat1.png", "/assets/cat1-2.png"],
    },
    {
      id: 4,
      image: "/assets/cat2.png",
      name: "Jericho",
      status: "Sin hogar",
      description: "Lorem ipsum...",
      location: "Versalles",
      phone: 3187399367,
      images: ["/assets/cat2.png", "/assets/cat2-2.png"],
    },
  ];

  const currentId = parseInt(petId);
  const animal = animals.find((a) => a.id === currentId);
  const previousAnimal = animals.find((a) => a.id === currentId - 1);
  const nextAnimal = animals.find((a) => a.id === currentId + 1);

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
          <Link href={`/animal-detail/${previousAnimal.id}`} passHref>
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
          <Link href={`/animal-detail/${nextAnimal.id}`} passHref>
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
            left: "40%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 800,
            height: "auto",
            zIndex: 1,
            mb: 2,
          }}
        >
          <Carousel animation="slide" interval={4000} indicators={true}>
            {animal.images?.map((img, index) => (
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
            ))}
          </Carousel>
        </Box>

        <Tooltip
          title={`¡Hola!, Soy ${animal.name} 🐾`}
          placement="top"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                fontSize: "1rem",
                backgroundColor: "var(--title-color)",
                color: "#fff",
                boxShadow: 3,
              },
            },
          }}
        >
          <CardMedia
            component="img"
            image={animal.image}
            alt={animal.name}
            sx={{
              width: 200,
              position: "absolute",
              left: "10%",
              bottom: 30,
              zIndex: 100,
              objectFit: "contain",
              borderRadius: 2,
              padding: 1,
              filter: "drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.5))",
              transition: "all 0.3s ease",
              ":hover": {
                filter: "drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.8))",
                transform: "scale(1.1)",
              },
            }}
          />
        </Tooltip>
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
                variant="h3"
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
                {animal.name}
                <PetsIcon fontSize="large" />
              </Typography>
              {/* Botón de editar */}
              {animal.id == 1 ? (
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
                    <EditIcon fontSize="large" />
                  </IconButton>
                </Box>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <Chip
                label={animal.status}
                color={animal.status === "Perdido" ? "error" : "warning"}
                sx={{ fontSize: "1rem", fontWeight: "bold", borderRadius: 1 }}
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
                }}
              >
                {animal.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <LocationOnIcon color="primary" />{" "}
                <strong>{animal.location}</strong>
                <Divider sx={{ mb: 2, width: 300, height: 5 }} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                <PhoneIcon color="primary" /> <strong>{animal.phone}</strong>
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
