"use client";

import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

interface GoBackBtnProps {
  texto?: string;
  rutaPredeterminada?: string;
}

const GoBackBtn: React.FC<GoBackBtnProps> = ({
  texto = "Ir Atrás",
  rutaPredeterminada = "/",
}) => {
  const router = useRouter();

  const handleHistory = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(rutaPredeterminada);
    }
  };

  return (
    <Button
      onClick={handleHistory}
      sx={{
        color: "var(--title-color)",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1,
        textTransform: "none",
        border: "none",
        padding: 0,
        borderRadius: "100px",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      <ArrowBackIcon sx={{ color: "var(--title-color)" }} />
      <Typography>{texto}</Typography>
    </Button>
  );
};

export default GoBackBtn;
