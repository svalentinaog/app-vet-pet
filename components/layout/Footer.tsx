"use client";

import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import PetsIcon from "@mui/icons-material/Pets";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "var(--primary-color)",
        color: "var(--light-color)",
        padding: {
          xs: "1.5em 1em 1.5em",
          sm: "1.5em 6em 1.5em",
          md: "2em 7.5em 2em",
          lg: "2em 15em 2em",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: { xs: "flex-start", md: "center" },
          alignContent: { xs: "flex-start", md: "center" },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 2 }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          {/* Logo */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                bgcolor: "var(--secondary-color)",
                color: "white",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PetsIcon />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              VetPet
            </Typography>
          </Stack>

          {/* Navigation */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{
              "& a": {
                color: "var(--light-color)",
                textDecoration: "none",
              },
            }}
          >
            <Link href="#">Soporte técnico</Link>
            <Link href="#">Términos y condiciones</Link>
          </Stack>

          {/* Social Icons */}
          <Stack direction="row" spacing={1}>
            <IconButton
              href="#"
              aria-label="Facebook"
              sx={{
                color: "white",
                ":hover": {
                  color: "var(--light-color)",
                },
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="#"
              aria-label="Instagram"
              sx={{
                color: "white",
                ":hover": {
                  color: "var(--light-color)",
                },
              }}
            >
              <Instagram />
            </IconButton>
          </Stack>
        </Stack>
        <Divider sx={{ borderColor: "var(--light-color)" }} />
        {/* Copyright */}
        <Typography
          width="100%"
          variant="body1"
          align="center"
          sx={{ mt: 2, color: "var(--light-color)" }}
        >
          © 2024 Todos los derechos reservados
        </Typography>
      </Box>
    </Box>
  );
}
