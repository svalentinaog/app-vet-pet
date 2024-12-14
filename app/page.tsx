"use client";
import Entry from "@/components/landingPage/Entry";
import BaseLayout from "@/components/layout/BaseLayout";
// import Link from "next/link";

export default function Home() {
  return (
    <BaseLayout>
      <Entry />
      {/* <h1>Hola soy la página de inicio</h1>

      <button>
        <Link href={"/login"}>Iniciar sesión</Link>
        <Link href={"/register"}>Registrate</Link>
        <Link href={"/chatbot"}>Chat de Consultas</Link>
        <Link href={"/profile"}>Perfil de Usuario</Link>
        <Link href={"/map"}>Mapa de localización</Link>
      </button> */}
    </BaseLayout>
  );
}
