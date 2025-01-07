import { NextResponse } from "next/server";

console.log(`[DEBUG] Middleware is running for URL: ${request.url}`);

export function middleware(request) {
  const logInfo = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for") || request.ip,
    referer: request.headers.get("referer"),
  };

  console.log(`[DEBUG] Middleware is running for URL: ${request.url}`);

  console.log(`[ACCESS LOG] ${JSON.stringify(logInfo)}`);
  return NextResponse.next(); // Continúa con la solicitud normalmente.
}

// Configuración para que se ejecute en todas las rutas
export const config = {
  matcher: "/:path*", // Activa el middleware para todas las rutas.
};