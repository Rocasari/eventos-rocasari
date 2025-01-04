// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // Versión básica
  // console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)

  // O versión más detallada
  const logInfo = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    status: response.status,
    userAgent: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for"),
    referer: request.headers.get("referer"),
  };

  console.log(JSON.stringify(logInfo));

  return NextResponse.next();
}

// Configuración para que se ejecute en todas las rutas
export const config = {
  matcher: "/:path*",
};
