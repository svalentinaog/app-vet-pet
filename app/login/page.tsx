import Link from "next/link";

export default function Login() {
  return (
    <div>
      <h1>Formulario de Iniciar Sesión</h1>

      <button>
        <Link href={"/"}>👉Volver al home</Link>
      </button>
    </div>
  );
}
