"use client";

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (typeof window !== "undefined" && window.scrollY > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
      {showButton && <Button onClick={scrollToTop}></Button>}
      {/* <Footer /> */}
    </Box>
  );
}
