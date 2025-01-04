import CardClient from "@/components/CardClient";
import Link from "next/link";
import { apiRoutes } from "@/lib/apiRoutes";

export default async function Clientes() {
  try {
    const url = apiRoutes.clientes.getAll();

    const response = await fetch(url, {
      headers: {
        "Api-Version": "1",
      },
      // Esta opción asegura que el fetch se realice en el servidor
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    const clientes = Array.isArray(result.data) ? result.data : [];

    const nav = apiRoutes.navegacion.home();

    return (
      <div className="w-full max-w-7xl p-6 mx-auto">
        {/* Contenedor de icono y título */}
        <div className="flex items-center justify-between space-x-4 mb-6">
          {/* Icono de inicio */}
          <a href={nav} target="_self" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-10 w-10 text-gray-700 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>

          {/* Título */}
          <h6 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Clientes
          </h6>

          {/* Icono para crear cliente */}
          <Link href="/clientes/crear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-10 w-10 text-green-700 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>

        {/* Lista de clientes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((cliente) => (
            <CardClient key={cliente.idCliente} cliente={cliente} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching clientes:", error);
    return <p>Error cargando clientes.</p>;
  }
}
