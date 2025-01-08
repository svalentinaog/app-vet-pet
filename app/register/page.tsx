"use client";

import CustomPassField from "@/components/CustomPassField";
import CustomTextField from "@/components/CustomTextField";
import GoBackBtn from "@/components/GoBackBtn";
import useUserAuthentication from "@/hooks/useUserAuthentication";
import {
  FormContainer,
  Fields,
  FormActions,
  MainButton,
  BtnGoogle,
} from "@/styles/mui";
import { CardMedia, Typography } from "@mui/material";
import Link from "next/link";

export default function Register() {
  const {
    user: { name, phone, email, password, confirmPassword },
    methods: { updateField, handleSignUpForm, handleGoogleSignIn },
  } = useUserAuthentication();

  return (
    <FormContainer size={{ sm: 6, xs: 12 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Crear cuenta
      </Typography>
      <Fields>
        <CustomTextField
          label="Nombre"
          value={name}
          onChange={updateField("name")}
        />
        <CustomTextField
          label="Telefono"
          value={phone}
          onChange={updateField("phone")}
        />
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
        <CustomPassField
          label="Confirmar contraseña"
          value={confirmPassword}
          onChange={updateField("confirmPassword")}
        />
      </Fields>
      <FormActions>
        {/* Botón de iniciar sesión */}
        <MainButton onClick={handleSignUpForm}>Crear cuenta</MainButton>
        {/* Enlace a la página de registro */}
        <Typography variant="subtitle1" sx={{ lineHeight: "normal" }}>
          ó continua con
        </Typography>
        {/* Iniciar sesión con Google */}
        <BtnGoogle onClick={handleGoogleSignIn}>
          <CardMedia
            component="img"
            image="/assets/google.png"
            alt="img"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </BtnGoogle>
        {/* Enlace a la página de registro */}
        <Typography variant="subtitle1" sx={{ lineHeight: "normal" }}>
          ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión</Link>
        </Typography>

        {/* me falto añadir boton ir atras link a home y view de register */}
      </FormActions>
    </FormContainer>
  );
}
