"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRoutes } from "@/lib/apiRoutes";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    nombre: "",
    numPersonas: "",
    duracion: "",
    total: "",
    fecha: "",
    local: {
      idLocal: "",
    },
  });

  const [locales, setLocales] = useState([]); // Inicializa como un array vacío
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Obtener la lista de locales al montar el componente
  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const url = apiRoutes.locales.getAll(); // Asegúrate de que esta ruta sea correcta
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Api-Version": "1",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los locales");
        }

        const data = await response.json();
        console.log("Respuesta del backend:", data); // Depura la respuesta completa

        // Extrae el array de locales de la clave `data`
        if (data.success && Array.isArray(data.data)) {
          setLocales(data.data);
        } else {
          console.error("La respuesta no contiene un array de locales:", data);
          setLocales([]); // Si no es un array, asigna un array vacío
        }
      } catch (error) {
        console.error("Error al obtener los locales:", error);
        setLocales([]); // En caso de error, asigna un array vacío
      }
    };

    fetchLocales();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "idLocal") {
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
    console.log("Datos enviados:", formData);
    try {
      const url = apiRoutes.eventos.create();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Version": "1",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (err) {
          errorData = `Código de estado: ${response.status}`;
        }
        console.error("Error en la respuesta del servidor:", errorData);
        throw new Error("Error al crear el evento");
      }

      const result = await response.json();
      console.log("Evento creado:", result);
      setMessage("Evento creado exitosamente");

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
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Local</label>
          <select
            name="idLocal"
            value={formData.local.idLocal}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Selecciona un local</option>
            {locales.map((local) => (
              <option key={local.idLocal} value={local.idLocal}>
                {local.nombre} {/* Ajusta según la estructura de tu objeto local */}
              </option>
            ))}
          </select>
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