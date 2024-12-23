"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FaceIcon from "@mui/icons-material/Face";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { MainButton } from "@/styles/mui";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";

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

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAuthButtonClick = () => {
    if (isAuthenticated) {
      navigation.push("/profile");
    } else {
      navigation.push("/login");
    }
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const sectionId = ["star", "functions", "reports", "mission"][newValue];
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const sectionOffsets = [
      { id: "star", index: 0 },
      { id: "functions", index: 1 },
      { id: "reports", index: 2 },
      { id: "mission", index: 3 },
      { id: "report", index: 4 },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      // Verificar si el usuario está en la parte superior de la página
      if (window.scrollY === 0) {
        setValue(0); // Marcar la primera sección como activa
        return;
      }

      for (let i = sectionOffsets.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionOffsets[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setValue(sectionOffsets[i].index);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        {/* start 🐸 Menu desplegable llamado SERVICIOS Mobile */}
        {[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "#functions" },
          { label: "Reportes", href: "#reports" },
          { label: "Misión", href: "#mission" },
          { label: "Crear reporte", href: "#report" },
          { label: "Consultar", href: "/chatbot" },
          { label: "Localizar", href: "/map" },
        ].map((item, index) => (
          <ListItem key={index} component={Link} href={item.href}>
            <ListItemText
              primary={item.label}
              sx={{ color: "var(--light-color)", textTransform: "uppercase" }}
            />
          </ListItem>
        ))}
        {/* end 🐸 Menu desplegable llamado SERVICIOS Mobile */}
        <Divider />
        <ListItem>
          <MainButton sx={{ marginTop: 1 }} onClick={handleAuthButtonClick}>
            {isAuthenticated ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <FaceIcon />
                <Typography>MI PERFIL</Typography>
              </Box>
            ) : (
              "INICIAR SESIÓN"
            )}
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
        background: scrolled ? "rgba(159, 164, 219, 0.7)" : "transparent",
        padding: {
          xs: scrolled ? "0.5em 1em 0.5em" : "1.5em 1em 1.5em",
          sm: scrolled ? "0.5em 6em 0.5em" : "1.5em 6em 1.5em",
          md: scrolled ? "0.5em 7.5em 0.5em" : "2em 7.5em 2em",
          lg: scrolled ? "0.75em 15em 0.75em" : "2em 15em 2em",
        },
        boxShadow: scrolled ? "0 1px 1px rgba(255, 255, 255, 0.1)" : "inherit",
        backdropFilter: scrolled ? "blur(5px)" : "none",
        transition: "all 0.3s",
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
        <Box sx={{ width: "auto" }}>
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
          {/* 🐈 MENU DESKTOP */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="secondary"
            sx={{ width: "auto" }}
          >
            <Tab
              label="Inicio"
              component={Link}
              href="/#star"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "primary.main",
                  textShadow: "none",
                },
                textShadow: scrolled
                  ? "2px 2px 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
            />
            <Tab
              label="Funcionalidades"
              component={Link}
              href="/#functions"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "primary.main",
                  textShadow: "none",
                },
                textShadow: scrolled
                  ? "2px 2px 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
            />
            <Tab
              label="Reportes"
              component={Link}
              href="/#reports"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "primary.main",
                  textShadow: "none",
                },
                textShadow: scrolled
                  ? "2px 2px 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
            />
            <Tab
              label="Mision"
              component={Link}
              href="/#mission"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "primary.main",
                  textShadow: "none",
                },
                textShadow: scrolled
                  ? "2px 2px 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
            />
            <Tab
              label="Crear reporte"
              component={Link}
              href="/#report"
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "primary.main",
                  textShadow: "none",
                },
                textShadow: scrolled
                  ? "2px 2px 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
            />

            {/* ¿QUE QUIERES HACER? - Menú desplegable */}
            <Tab
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  OTROS SERVICIOS
                  {open ? (
                    <KeyboardArrowUp
                      sx={{ marginLeft: 1, cursor: "pointer" }}
                    />
                  ) : (
                    <KeyboardArrowDown
                      sx={{ marginLeft: 1, cursor: "pointer" }}
                    />
                  )}
                </Box>
              }
              sx={{
                color: "white",
                "&.Mui-selected": {
                  color: "primary.main",
                  textShadow: "none",
                },
                textShadow: scrolled
                  ? "2px 2px 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              }}
              onClick={handleMenuClick}
              aria-controls={open ? "services-menu" : undefined}
              aria-haspopup="true"
            />
            <Menu
              id="services-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "services-button",
              }}
            >
              <MenuItem onClick={handleClose} sx={{ width: "200px" }}>
                <Link
                  href="/chatbot"
                  passHref
                  style={{
                    textDecoration: "none",
                    color: "var(--title-color)",
                    textTransform: "uppercase",
                    fontSize: "14px",
                  }}
                >
                  Consultar
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  href="/map"
                  passHref
                  style={{
                    textDecoration: "none",
                    color: "var(--title-color)",
                    textTransform: "uppercase",
                    fontSize: "14px",
                  }}
                >
                  Localizar
                </Link>
              </MenuItem>
            </Menu>
          </Tabs>
          <MainButton
            sx={{ maxWidth: "200px" }}
            onClick={handleAuthButtonClick}
          >
            {isAuthenticated ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <FaceIcon />
                <Typography>MI PERFIL</Typography>
              </Box>
            ) : (
              "INICIAR SESIÓN"
            )}
          </MainButton>
        </Box>

        {/* 🐈 MENU MOBILE */}
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
      {/* 🐥 ITEMS DE MENU MOBILE */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}
