import Link from "next/link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box
      sx={{
        color: "#ffff",
        padding: 2,
        alignItems: "center",
      }}
    >
      <h1>Hola soy la página de inicio</h1>
      <Box
      sx={{
        display: "flex",
        gap: 0.5,
      }}
      >
        <Button variant="contained">
          <Link href={"/login"}>Iniciar sesión</Link>
        </Button>
        <Button variant="contained">
          <Link href={"/register"}>Registrate</Link>
        </Button>
        <Button variant="contained">
          <Link href={"/chatbot"}>Chat de Consultas</Link>
        </Button>
        <Button variant="contained">
          <Link href={"/profile"}>Perfil de Usuario</Link>
        </Button>
        <Button variant="contained">
          <Link href={"/map"}>Mapa de localización</Link>
        </Button>
        <Button variant="contained">
          <Link href={"/report"}>Reporte de Mascotas</Link>
        </Button>
      </Box>
    </Box>
  );
}
