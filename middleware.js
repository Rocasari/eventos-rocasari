// middleware.js
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function middleware(request) {
  const logInfo = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for") || request.ip,
    referer: request.headers.get("referer"),
  };

  // Crear log personalizado
  const logMessage = `${JSON.stringify(logInfo)}\n`;
  const logPath = path.join(process.cwd(), 'logs', 'access.log');

  try {
    // Asegurarse que el directorio existe
    fs.mkdirSync(path.join(process.cwd(), 'logs'), { recursive: true });
    fs.appendFileSync(logPath, logMessage);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }

  const response = NextResponse.next();
  
  // Capturar códigos de estado
  response.on('finish', () => {
    const statusCode = response.status;
    if (statusCode >= 400) {
      const errorLog = {
        ...logInfo,
        statusCode,
        error: response.statusText
      };
      fs.appendFileSync(
        path.join(process.cwd(), 'logs', 'error.log'),
        `${JSON.stringify(errorLog)}\n`
      );
    }
  });

  return response;
}

export const config = {
  matcher: "/:path*"
};