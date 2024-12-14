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
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { MainButton } from "@/styles/mui";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface LinkTabProps {
  label?: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false); // Estado para controlar el scroll

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
      sx={{ width: 250, height: "100vh", background: "var(--primary-color)" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/assets/logo.svg"
              alt="Logo"
              width={100}
              height={0}
              layout="intrinsic"
            />
          </Box>
        </ListItem>

        {[
          { label: "Inicio", href: "/" },
          { label: "Informar", href: "#report" },
          { label: "Consultar", href: "/chatbot" },
          { label: "Localizar", href: "/map" },
        ].map((item, index) => (
          <ListItem key={index} component={Link} href={item.href}>
            <ListItemText
              primary={item.label}
              sx={{ color: "var(--light-color)" }}
            />
          </ListItem>
        ))}
        <ListItem>
          <MainButton fullWidth href="/login">
            INICIAR SESIÓN
          </MainButton>
        </ListItem>
      </List>
    </Box>
  );

  // Función para monitorear el scroll y aplicar el efecto blur
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Activa el fondo blur
      } else {
        setScrolled(false); // Desactiva el fondo blur
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
        background: scrolled ? "rgba(0, 0, 0, 0.1)" : "transparent",
        padding: "1em 0 1em",
        boxShadow: scrolled ? "0 1px 1px rgba(255, 255, 255, 0.1)" : "inherit",
        backdropFilter: scrolled ? "blur(2px)" : "none",
        transition: "background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Icono de la App (Logo)*/}
          <Box>
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
              width: "50%",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="secondary"
            >
              <LinkTab label="Inicio" href="/" />
              <LinkTab label="Informar" href="#report" />
              <LinkTab label="Consultar" href="/chatbot" />
              <LinkTab label="Localizar" href="/map" />
            </Tabs>

            <MainButton sx={{ maxWidth: "200px" }} href="/login">
              INICIAR SESIÓN
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
      </Container>
    </AppBar>
  );
}
