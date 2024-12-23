"use client";

import React, { useState, useEffect } from "react";
import { Box, Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Se verifica si el código se ejecuta solo en el cliente
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };

      // Agregar el event listener
      window.addEventListener("scroll", handleScroll);

      // Limpiar el event listener cuando el componente se desmonte
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Desplazamiento suave
      });
    }
  };

  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
      <Footer />
      {/* Botón para ir arriba */}
      <Fab
        color="secondary"
        sx={{
          color: "white",
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 1000,
          opacity: showButton ? 1 : 0,
          transform: showButton ? "translateY(0)" : "translateY(20px)",
          visibility: showButton ? "visible" : "hidden",
          transition:
            "opacity 0.3s ease, transform 0.3s ease, visibility 0s linear 0.3s", // Transición suave
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        onClick={scrollToTop}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Box>
  );
}
