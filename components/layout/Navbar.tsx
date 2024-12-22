"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Tabs,
  Tab,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { MainButton } from "@/styles/mui";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface LinkTabProps {
  label?: string;
  href: string;
}

export default function Navbar() {
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const navigation = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      navigation.push("/profile");
    } else {
      navigation.push("/login");
    }
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const LinkTab = (props: LinkTabProps) => {
    const isActive = pathname === props.href;
    return (
      <Tab
        component="a"
        aria-current={isActive ? "page" : undefined}
        {...props}
        sx={{ color: "white" }}
      />
    );
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        background: "var(--primary-color)",
        alignItems: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={100}
              height={0}
              layout="intrinsic"
            />
          </Box>
        </ListItem>
        <Divider />

        {[
          { label: "Inicio", href: "/" },
          // start Menu desplegable llamado funcionalidades
          { label: "Informar", href: "#report" },
          { label: "Consultar", href: "/chatbot" },
          { label: "Localizar", href: "/map" },
          // end Menu desplegable llamado funcionalidades
        ].map((item, index) => (
          <ListItem key={index} component={Link} href={item.href}>
            <ListItemText
              primary={item.label}
              sx={{ color: "var(--light-color)", textTransform: "uppercase" }}
            />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <MainButton sx={{ marginTop: 1 }} onClick={handleAuthButtonClick}>
            {isAuthenticated ? "SESIÓN INICIADA" : "INICIAR SESIÓN"}
          </MainButton>
        </ListItem>
      </List>
    </Box>
  );

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        background: scrolled ? "rgba(0, 0, 0, 0.1)" : "transparent",
        padding: {
          xs: "1em 1em 1em",
          sm: "1em 6em 1em",
          md: "1em 7.5em 1em",
          lg: "2em 15em 2em",
        },
        boxShadow: scrolled ? "0 1px 1px rgba(255, 255, 255, 0.1)" : "inherit",
        backdropFilter: scrolled ? "blur(2px)" : "none",
        transition: "background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Icono de la App (Logo)*/}
        <Box sx={{ width: "100%" }}>
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={100}
            height={0}
            layout="intrinsic"
          />
        </Box>
        {/* Navbar Tabs (Desktop) */}
        <Box
          sx={{
            width: "100%",
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="secondary"
            sx={{ width: "auto" }}
          >
            <LinkTab label="Inicio" href="/" />

            {/* Menú desplegable */}
            {/* start Menu desplegable llamado funcionalidades */}
            <LinkTab label="Informar" href="#report" />
            <LinkTab label="Consultar" href="/chatbot" />
            <LinkTab label="Localizar" href="/map" />
            {/* end Menu desplegable llamado funcionalidades */}
          </Tabs>
          <MainButton
            sx={{ maxWidth: "200px" }}
            onClick={handleAuthButtonClick}
          >
            {isAuthenticated ? "SESIÓN INICIADA" : "INICIAR SESIÓN"}
          </MainButton>
        </Box>

        {/* Menu de Hamburguesa (Mobile) */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            onClick={toggleDrawer(true)}
            color="inherit"
            sx={{ color: "var(--light-color)" }}
          >
            <MenuOpenIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {/* Drawer para el Menú de Navegación en Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}
