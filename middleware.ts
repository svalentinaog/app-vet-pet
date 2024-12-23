import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Verifica si el usuario está autenticado
  const token = req.cookies.get("auth-token");

  const protectedRoutes = ["/reports", "/chatbot", "/map"]; // Rutas protegidas

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Se aplica el middleware solo a las rutas específicas
export const config = {
  matcher: ["/reports", "/chatbot", "/map"], // Solo estas rutas serán protegidas
};