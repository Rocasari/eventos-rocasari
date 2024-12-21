"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRoutes } from "@/lib/apiRoutes";

export default function CreateDecoration() {
  const [formData, setFormData] = useState({
    descripcion: "",
    precio: "",
    color: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter(); // Hook para manejar la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData); // Verifica los datos enviados
    try {
      const url = apiRoutes.decoraciones.create();
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Version": "1",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la respuesta del servidor:", errorData);
        throw new Error("Error al crear la decoración");
      }

      const result = await response.json();
      setMessage("Decoracion creada exitosamente");

      setFormData({
        descripcion: "",
        precio: "",
        color: "",
      });

      router.push("/decoraciones");
    } catch (error) {
      console.error("Error creando cliente:", error);
      setMessage("Error creando el cliente");
    }
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Descripción
          </label>
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
          Crear
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
