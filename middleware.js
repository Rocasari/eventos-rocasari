// middleware.js
import { NextResponse } from "next/server";
import fs from 'fs/promises';

async function logRequest(info) {
  const logPath = '/var/www/eventos-rocasari/logs/api.log';
  await fs.appendFile(logPath, `${JSON.stringify(info)}\n`)
    .catch(console.error);
}

export async function middleware(request) {
  const startTime = Date.now();
  const url = new URL(request.url);
  
  const logInfo = {
    timestamp: new Date().toISOString(),
    method: request.method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    userAgent: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for") || request.ip,
  };

  try {
    const response = NextResponse.next();
    
    // Detectar errores 404
    if (response.headers.get('x-nextjs-route-type') === 'not-found') {
      logInfo.statusCode = 404;
      logInfo.type = 'NOT_FOUND';
      await logRequest(logInfo);
      return response;
    }

    // Capturar errores 500 y otros
    response.headers.set('x-response-time', `${Date.now() - startTime}ms`);
    
    const isApiRoute = url.pathname.startsWith('/api/');
    if (isApiRoute) {
      logInfo.statusCode = response.status;
      logInfo.type = response.status >= 500 ? 'SERVER_ERROR' : 'API_CALL';
      logInfo.responseTime = `${Date.now() - startTime}ms`;
    }

    await logRequest(logInfo);
    return response;

  } catch (error) {
    logInfo.statusCode = 500;
    logInfo.type = 'SERVER_ERROR';
    logInfo.error = error.message;
    await logRequest(logInfo);
    
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|favicon.ico).*)',
  ]
};