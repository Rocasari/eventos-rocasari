"use client";  

import { useState } from "react";  
import { useRouter } from "next/navigation";  

export default function CreateEvent() {  
  const [formData, setFormData] = useState({  
    nombre: "",  
    numPersonas: "",  
    duracion: "",  
    total: "",  
    fecha: "",  
    local: {  
      idLocal: "", // Cambiado para reflejar la estructura esperada  
    },  
  });  

  const [message, setMessage] = useState("");  
  const router = useRouter(); // Hook para manejar la navegación  

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    if (name === "idLocal") {  
      // Actualiza solo el campo idLocal dentro de local  
      setFormData({  
        ...formData,  
        local: { ...formData.local, idLocal: value },  
      });  
    } else {  
      setFormData({ ...formData, [name]: value });  
    }  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    console.log("Datos enviados:", formData); // Verifica los datos enviados  
    try {  
      const response = await fetch("http://localhost:8002/api/eventos", {  
        method: "POST",  
        headers: {  
          "Content-Type": "application/json",  
          "Api-Version": "1",  
        },  
        body: JSON.stringify(formData),  
      });  

      console.log("Respuesta del servidor:", response); // Verifica la respuesta  

      if (!response.ok) {  
        let errorData;  
        try {  
          errorData = await response.json(); // Intenta obtener el cuerpo del error  
        } catch (err) {  
          errorData = `Código de estado: ${response.status}`; // Si no hay cuerpo JSON, muestra el código de estado  
        }  
        console.error("Error en la respuesta del servidor:", errorData);  
        throw new Error("Error al crear el evento");  
      }  

      const result = await response.json();  
      console.log("Evento creado:", result); // Verifica el resultado  
      setMessage("Evento creado exitosamente");  

      // Limpia el formulario  
      setFormData({  
        nombre: "",  
        numPersonas: "",  
        duracion: "",  
        total: "",  
        fecha: "",  
        local: {  
          idLocal: "",  
        },  
      });  

      // Redirige a la lista de eventos  
      router.push("/eventos");  
    } catch (error) {  
      console.error("Error creando evento:", error);  
      setMessage("Error creando el evento");  
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
          <label className="block text-sm font-medium">  
            Número de Personas  
          </label>  
          <input  
            type="number"  
            name="numPersonas"  
            value={formData.numPersonas}  
            onChange={handleChange}  
            className="w-full px-3 py-2 border rounded"  
            required  
          />  
        </div>  
        <div>  
          <label className="block text-sm font-medium">Duración</label>  
          <input  
            type="text"  
            name="duracion"  
            value={formData.duracion}  
            onChange={handleChange}  
            className="w-full px-3 py-2 border rounded"  
            required  
          />  
        </div>  
        <div>  
          <label className="block text-sm font-medium">Total</label>  
          <input  
            type="number"  
            name="total"  
            value={formData.total}  
            onChange={handleChange}  
            className="w-full px-3 py-2 border rounded"  
            required  
          />  
        </div>  
        <div>  
          <label className="block text-sm font-medium">Fecha</label>  
          <input  
            type="date" // Tipo de entrada para fecha  
            name="fecha"  
            value={formData.fecha}  
            onChange={handleChange}  
            className="w-full px-3 py-2 border rounded"  
            required  
          />  
        </div>  
        <div>  
          <label className="block text-sm font-medium">Local</label>  
          <input  
            type="number"  
            name="idLocal" // Cambiado para reflejar la propiedad del objeto  
            value={formData.local.idLocal} // Accede a la propiedad idLocal  
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