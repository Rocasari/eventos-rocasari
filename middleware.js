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

  console.log(`[ACCESS LOG] ${JSON.stringify(logInfo)}`);

  // Registra el código de estado (404 o 500) en la respuesta
  return NextResponse.next().then((response) => {
    const statusCode = response.status || 200; // Por defecto es 200 si no hay error

    if (statusCode === 404 || statusCode >= 500) {
      console.error(`[ERROR ${statusCode}] ${JSON.stringify(logInfo)}`);
    }

    return response;
  });
}

// Configuración para que se ejecute en todas las rutas
export const config = {
  matcher: "/:path*",
};
