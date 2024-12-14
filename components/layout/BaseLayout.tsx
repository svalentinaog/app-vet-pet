"use client";

import React from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/system";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
}
