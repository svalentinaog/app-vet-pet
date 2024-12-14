"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppBar, Toolbar } from "@mui/material";
import { Box, Container } from "@mui/system";
import AdbIcon from "@mui/icons-material/Adb";
import { MainButton } from "@/styles/mui";
import Link from "next/link";

interface LinkTabProps {
  label?: string;
  href: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Link href={props.href} passHref>
      <Tab
        component="a"
        aria-current={
          props.href === window.location.pathname ? "page" : undefined
        }
        {...props}
        sx={{ color: "white" }}
      />
    </Link>
  );
}

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "transparent",
        padding: "1em",
        boxShadow: "inherit",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <AdbIcon />
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="nav tabs example"
              role="navigation"
            >
              <LinkTab label="Inicio" href="/" />
              <LinkTab label="Informar" href="#report" />
              <LinkTab label="Consultar" href="/chatbot" />
              <LinkTab label="Localizar" href="/map" />
            </Tabs>

            <MainButton sx={{ maxWidth: "200px" }}>INICIAR SESIÓN</MainButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
