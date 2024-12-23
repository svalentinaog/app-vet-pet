"use client"

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  // Si el usuario no está autenticado, mostramos este mensaje
  if (!isAuthenticated) {
    return (
      <div>
        <h1>Acceso denegado</h1>
        <p>Por favor, inicia sesión para ver tu perfil.</p>
        <Link href="/login">👉 Iniciar sesión</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <div>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <Link href={"/"}>👉 Volver al home</Link>
    </div>
  );
}