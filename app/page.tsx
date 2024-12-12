import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hola soy la página de inicio</h1>

      <button>

        <Link href={"/userinfo"}>👉Ir al userform</Link>        
        <Link href={"/login"}>Iniciar sesión</Link>
        <Link href={"/register"}>Registrate</Link>
        <Link href={"/chatbot"}>Chat de Consultas</Link>
        <Link href={"/profile"}>Perfil de Usuario</Link>
        <Link href={"/map"}>Mapa de localización</Link>
      </button>
    </div>
  );
}
