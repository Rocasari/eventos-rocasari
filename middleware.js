import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export function middleware(req) {
  // Obtener la URL de la solicitud
  const url = req.nextUrl.pathname;

  // Obtener la fecha y hora actual
  const timestamp = new Date().toISOString();

  // Crear el mensaje de log
  const logMessage = `[${timestamp}] Request to: ${url}\n`;

  // Ruta del archivo de logs
  const logFilePath = path.join(process.cwd(), 'logs', 'requests.log');

  // Asegurarse de que el directorio de logs exista
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  }

  // Escribir el log en el archivo
  fs.appendFileSync(logFilePath, logMessage);

  // Continuar con la solicitud
  return NextResponse.next();
}