import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hola soy la página de inicio</h1>

      <button>
        <Link href={"/chatbot"}>👉Ir al chatbot</Link>

        
        <Link href={"/userinfo"}>👉Ir al userform</Link>
        
      </button>
    </div>
  );
}
