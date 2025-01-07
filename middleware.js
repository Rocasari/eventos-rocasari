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
  
  const response = NextResponse.next();

  response.headers.set('x-start-time', logInfo.timestamp);

  response.then(res => {
    logInfo.status = res.status;

    if (logInfo.status === 404 || logInfo.status === 500) {
      console.log(`[MIDDLEWARE LOG] ${JSON.stringify(logInfo)}`);
    }

    if (res.headers.get('x-start-time')) {
      const startTime = new Date(res.headers.get('x-start-time')).getTime();
      const endTime = new Date().getTime();
      logInfo.processingTime = `${endTime - startTime}ms`;

      console.log(`[MIDDLEWARE LOG] ${JSON.stringify(logInfo)}`);
    }
  });

  return response;
}

// Configuración para que se ejecute en todas las rutas
export const config = {
  matcher: "/:path*",
};