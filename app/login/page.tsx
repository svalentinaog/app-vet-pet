"use client";

import CustomPassField from "@/components/CustomPassField";
import CustomTextField from "@/components/CustomTextField";
import useUserAuthentication from "@/hooks/useUserAuthentication";
import { FormContainer, Fields, FormActions, MainButton } from "@/styles/mui";
import { Button, CardMedia, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "@/lib/firebase";
import Link from "next/link";

export default function Login() {
  const {
    user: { email, password },
    methods: { updateField, handleSignInForm },
  } = useUserAuthentication();

  return (
    <FormContainer size={{ sm: 6, xs: 12 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Iniciar sesión
      </Typography>
      <Fields>
        <CustomTextField
          label="Correo electrónico"
          value={email}
          onChange={updateField("email")}
        />
        <CustomPassField
          label="Contraseña"
          value={password}
          onChange={updateField("password")}
        />
      </Fields>
      <FormActions>
        {/* Botón de iniciar sesión */}
        <MainButton
          onClick={handleSignInForm}
        >
          Acceder
        </MainButton>
        {/* Enlace a la página de registro */}
        <Typography variant="subtitle1" sx={{ lineHeight: "normal" }}>
          ó continua con
        </Typography>
        <Button sx={{
          minWidth: "50px",
          minHeight: "50px",
          width: "50px",
          height: "50px",
          padding: "0.75em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          textAlign: "center",
          color: "white",
          background: "rgba(0, 0, 0, 0.075)",
          borderRadius: "10px",
          ":hover": {
            background: "rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          },
        }}>
          <CardMedia
            component="img"
            image="/assets/google.png"
            alt="img"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}/>
        </Button>
        {/* Enlace a la página de registro */}
        <Typography variant="subtitle1" sx={{ lineHeight: "normal" }}>
          ¿No tienes una cuenta? <Link href="/register">Registrate</Link>
        </Typography>
      </FormActions>
    </FormContainer>
  );
}