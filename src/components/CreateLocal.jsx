"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLocal() {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    aforo: "",
    referencia: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter(); // Hook para manejar la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8002/api/locales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Version": "1",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el local");
      }

      const result = await response.json();
      setMessage("Local creado exitosamente");

      // Limpia el formulario
      setFormData({
        nombre: "",
        ubicacion: "",
        aforo: "",
        referencia: "",
      });

      // Redirige a la lista de empleados
      router.push("/locales");
    } catch (error) {
      console.error("Error creando local:", error);
      setMessage("Error creando el local");
    }
  };

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
