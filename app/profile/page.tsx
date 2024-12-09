import Link from "next/link";

export default function Profile() {
  return (
    <div>
      <h1>Perfil de Usuario</h1>

      <button>
        <Link href={"/"}>👉Volver al home</Link>
      </button>
    </div>
  );
}
