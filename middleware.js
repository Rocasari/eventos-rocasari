import { NextResponse } from "next/server";

export function middleware(request) {
  const logInfo = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for") || request.ip,
    referer: request.headers.get("referer"),
  };

  console.log(`[ACCESS LOG] ${JSON.stringify(logInfo)}`); // Asegúrate de que esté incluido.

  return NextResponse.next();
}

// Configuración para que se ejecute en todas las rutas
export const config = {
  matcher: "/:path*",
};