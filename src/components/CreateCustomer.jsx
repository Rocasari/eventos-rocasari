"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRoutes } from "@/lib/apiRoutes";

export default function CreateCustomer() {
  const [formData, setFormData] = useState({
    nombre: "",
    di: "",
    direccion: "",
    telefono: "",
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
      const url = apiRoutes.clientes.create();

      const response = await fetch(url, {  
        method: "POST",  
        headers: {  
          "Content-Type": "application/json",  
          "Api-Version": "1",  
        },  
        body: JSON.stringify(formData),  
      });  
  
      console.log("Respuesta del servidor:", response); // Verifica la respuesta  
  
      if (!response.ok) {  
        const errorData = await response.json();  
        console.error("Error en la respuesta del servidor:", errorData);  
        throw new Error("Error al crear el cliente");  
      }  
  
      const result = await response.json();  
      console.log("Cliente creado:", result); // Verifica el resultado  
      setMessage("Cliente creado exitosamente");  
  
      setFormData({  
        nombre: "",  
        di: "",  
        direccion: "",  
        telefono: "",  
      });  
  
      router.push("/clientes");  
    } catch (error) {  
      console.error("Error creando cliente:", error);  
      setMessage("Error creando el cliente");  
    }  
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombres y Apellidos</label>
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
          <label className="block text-sm font-medium">DI</label>
          <input
            type="text"
            name="di"
            value={formData.di}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
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
