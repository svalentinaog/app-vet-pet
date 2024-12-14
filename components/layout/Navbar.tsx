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
          <MainButton fullWidth>INICIAR SESIÓN</MainButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{ background: "transparent", padding: "1em", boxShadow: "inherit" }}
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
              gap: 6,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <LinkTab label="Inicio" href="/" />
              <LinkTab label="Informar" href="#report" />
              <LinkTab label="Consultar" href="/chatbot" />
              <LinkTab label="Localizar" href="/map" />
            </Tabs>

            <MainButton sx={{ maxWidth: "200px" }}>INICIAR SESIÓN</MainButton>
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
