"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardMedia } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PetsIcon from "@mui/icons-material/Pets";
import Link from "next/link";

export interface FormDataReport {
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

interface AnimalCardProps {
  animal: FormDataReport;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  const statusColors: Record<string, string> = {
    "Sin hogar": "#3DC132",
    Perdido: "#CC818E",
  };

  return (
    <Link href={`/animal-detail/${String(animal.id)}`} legacyBehavior>
      <Card
        sx={{
          aspectRatio: { xs: "none", md: "4 / 6", lg: "none" },
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          boxShadow: "0px 4px 8px rgba(159, 164, 219, 0.1)",
          borderRadius: 4,
          overflow: "hidden",
          transition: "border-color 0.3s",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "white",
          ":hover": {
            borderColor: "var(--secondary-color)",
            boxShadow: "0 0 15px var(--secondary-color)",
            transition: "all 0.3s ease-in-out",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          padding: 3,
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "auto",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            objectFit: "contain",
          }}
        >
          <CardMedia
            component="img"
            image={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${animal.images[0]}`}
            alt={animal.petName}
            sx={{
              height: { xs: "250px", md: "225px", lg: "250px" },
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <CardContent
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            paddingTop: 0,
            paddingBottom: "0 !important",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Typography variant="body1" component="div">
            {animal.petName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {animal.description.split(" ").slice(0, 4).join(" ")}
            {animal.description.split(" ").length > 4 && "…"}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span
              style={{
                fontSize: "25px",
                color: animal?.status
                  ? statusColors[animal.status] || "gray"
                  : "gray",
              }}
            >
              •
            </span>
            {animal.status}
          </Typography>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <PetsIcon sx={{ color: "var(--secondary-color)" }} />
            <a href={`tel:${animal.phone}`}>
              <Box
                sx={{
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "var(--title-color)",
                  background: "transparent",
                  ":hover": {
                    transition: "all .3s",
                    background: "rgba(159, 164, 219, 0.05)",
                    color: "#70d168",
                  },
                }}
              >
                <PhoneIcon />
              </Box>
            </a>
          </CardActions>
        </CardContent>
      </Card>
    </Link>
  );
}
