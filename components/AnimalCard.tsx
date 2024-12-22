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

export interface Animal {
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
    <Link href={`/animal-detail/${String(animal.id)}`} legacyBehavior>
      <Card
        sx={{
          aspectRatio: "4 / 5",
          width: "100%",
          height: "auto",
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
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={animal.image}
            alt={animal.name}
            sx={{
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
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
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
              textTransform: "uppercase",
              display: "flex",
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
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <PetsIcon sx={{ color: "var(--secondary-color)" }} />
            <a href={`tel:${animal.phone}`}>
              <Button
                sx={{
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
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
    </Link>
  );
}
