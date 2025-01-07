import { NextResponse } from "next/server";

export function middleware(request) {
  const logInfo = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
  };

  console.log(`[MIDDLEWARE TEST] ${JSON.stringify(logInfo)}`);

  return NextResponse.next();
}

// Configuración para que se ejecute en todas las rutas
export const config = {
  matcher: "/:path*",
};
