import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Obtener el token de autenticación
  const token = req.cookies.get("auth-token");

  // Definir las rutas protegidas
  const protectedRoutes = ["/reports", "/chatbot", "/map", "/profile"];

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
  if (
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const response = NextResponse.next();

  // Deshabilitar el caché para las rutas protegidas
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}

// Se aplica el middleware solo a las rutas específicas
export const config = {
  matcher: ["/reports", "/chatbot", "/map", "/profile"], // Solo estas rutas serán protegidas
};
