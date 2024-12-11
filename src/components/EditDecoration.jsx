"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditDecoration({ id }) {
  const [formData, setFormData] = useState({
    descripcion: "",
    precio: "",
    color: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const router = useRouter();

  // Obtener los datos de la decoración al cargar el componente
  useEffect(() => {
    const fetchDecoration = async () => {
      try {
        const response = await fetch(
          `http://localhost:8002/api/decoraciones/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Api-Version": "1",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de la decoración");
        }

        const data = await response.json();
        setFormData({
          descripcion: data.data.descripcion || "",
          precio: data.data.precio || "",
          color: data.data.color || "",
        });
        setLoading(false); // Finaliza la carga
      } catch (error) {
        console.error("Error al cargar la decoración:", error);
        setMessage("Error al cargar los datos de la decoración");
        setLoading(false); // Finaliza la carga incluso si hay error
      }
    };

    if (id) {
      fetchDecoration(); // Llama a la función solo si el ID está disponible
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
        `http://localhost:8002/api/decoraciones/${id}`,
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
      console.log("Decoración actualizada:", result);
      setMessage("Decoración actualizada exitosamente");

      // Redirigir al usuario a la lista de decoraciones
      router.push("/decoraciones");
    } catch (error) {
      console.error("Error actualizando la decoración:", error);
      setMessage("Error actualizando la decoración");
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>; // Muestra un mensaje mientras se cargan los datos
  }

  return (
    <div className="w-full max-w-md p-6 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Precio</label>
          <input
            type="text"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Color</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Actualizar
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
