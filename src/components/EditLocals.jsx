"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function EditLocal({ id }) {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    aforo: "",
    referencia: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const router = useRouter();

  // Obtener los datos de la decoración al cargar el componente
  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const url = 
        
        const response = await fetch(
          `http://localhost:8080/api/locales/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Api-Version": "1",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del local");
        }

        const data = await response.json();
        setFormData({
          nombre: data.data.nombre || "",
          ubicacion: data.data.ubicacion || "",
          aforo: data.data.aforo || "",
          referencia: data.data.referencia || "",
        });
        setLoading(false); // Finaliza la carga
      } catch (error) {
        console.error("Error al cargar el local:", error);
        setMessage("Error al cargar los datos del local");
        setLoading(false); // Finaliza la carga incluso si hay error
      }
    };

    if (id) {
        fetchLocal(); // Llama a la función solo si el ID está disponible
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8002/api/locales/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Api-Version": "1",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la respuesta del servidor:", errorData);
        throw new Error("Error al actualizar la decoración");
      }

      const result = await response.json();
      console.log("Local actualizado:", result);
      setMessage("Local actualizado exitosamente");

      // Redirigir al usuario a la lista de decoraciones
      router.push("/locales");
    } catch (error) {
      console.error("Error actualizando el local:", error);
      setMessage("Error actualizando el local");
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  return (
    <div className="w-full max-w-md p-6 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Aforo</label>
          <input
            type="text"
            name="aforo"
            value={formData.aforo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Referencia</label>
          <input
            type="text"
            name="referencia"
            value={formData.referencia}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Crear
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
