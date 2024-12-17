"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardMedia } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PetsIcon from "@mui/icons-material/Pets";

interface Animal {
  id: number;
  image: string;
  name: string;
  status: string;
  description: string;
  location: string;
  phone: number;
}

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  const statusColors: Record<string, string> = {
    "Sin hogar": "#3DC132",
    Perdido: "#CC818E",
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto",
        marginBottom: 2,
        backgroundColor: "white",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
        overflow: "hidden",
        transition: "border-color 0.3s",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "white",
        ":hover": {
          borderColor: "var(--secondary-color)",
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto", // Altura fija del contenedor
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // Asegura que no haya desbordamiento
        }}
      >
        <CardMedia
          component="img"
          image={animal.image}
          alt={animal.name}
          sx={{
            maxWidth: "100%",
            height: {xs: 200, md: 180, sm: 250},
            objectFit: "contain", // "contain" para evitar recortes
            marginTop: 4,
          }}
        />
      </Box>
      <CardContent
        sx={{ padding: 4, gap: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="body1" component="div">
          {animal.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {animal.description}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "flex",
            textTransform: "uppercase",
            alignItems: "center",
            gap: 1,
          }}
        >
          <span
            style={{
              color: statusColors[animal.status] || "gray",
            }}
          >
            •
          </span>
          {animal.status}
        </Typography>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <PetsIcon sx={{ color: "var(--secondary-color)" }} />
          <a href={`tel:${animal.phone}`}>
            <Button
              sx={{
                borderRadius: "50px",
                minWidth: "50px",
                height: "50px",
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PhoneIcon />
            </Button>
          </a>
        </CardActions>
      </CardContent>
    </Card>
  );
}
