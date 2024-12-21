"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRoutes } from "@/lib/apiRoutes";

export default function CardDecoraciones({ decoracion }) {
  const router = useRouter(); // Hook para manejar la navegación

  const handleDelete = async (decoracion) => {
    const confirmDelete = confirm(
      `¿Estás seguro de que deseas eliminar la decoración "${decoracion.descripcion}"?`
    );
    if (!confirmDelete) return;

    try {
      const url = apiRoutes.decoraciones.delete(decoracion.idDecoracion);

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Api-Version": "1", // Si necesitas esta cabecera
        },
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error("Error al eliminar la decoración (datos del servidor):", errorData);
        } catch (jsonError) {
          console.error("Error al analizar la respuesta del servidor:", jsonError);
        }
        throw new Error("Error al eliminar la decoración");
      }

      alert("Decoración eliminada exitosamente");
      router.refresh(); // Refresca la página para actualizar la lista
    } catch (error) {
      console.error("Error eliminando la decoración:", error);
      alert("Hubo un error al eliminar la decoración");
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-5 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">
          {decoracion.descripcion}
        </h5>
        <div className="flex items-center justify-between mb-1 gap-4">
          {/* Editar Decoración */}
          <Link href={`/decoraciones/editar/${decoracion.idDecoracion}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 text-blue-700 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </Link>
          {/* Eliminar Decoración */}
          <button onClick={() => handleDelete(decoracion)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 text-red-700 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Decoracion Info */}
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-auto">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Precio:{" "}
                </span>
                {decoracion.precio}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Color:{" "}
                </span>
                {decoracion.color}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}