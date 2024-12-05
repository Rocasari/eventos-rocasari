import CardClient from "@/components/CardClient";  
import Link from "next/link";  

export default async function Clientes() {  
  try {  
    const response = await fetch("http://localhost:8002/api/clientes", {  
      headers: {  
        "Api-Version": "1",  
      },  
    });  

    if (!response.ok) {  
      throw new Error("Network response was not ok");  
    }  

    const result = await response.json();  
    const clientes = Array.isArray(result.data) ? result.data : [];  

    return (  
      <div className="w-full max-w-md p-6 mx-auto">  
        {/* Contenedor de icono y título */}  
        <div className="flex items-center justify-between space-x-4 mb-6">  
          {/* Icono de inicio */}  
          <a  
            href="http://localhost:3000/"  
            target="_self"  
            rel="noopener noreferrer"  
          >  
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
            Lista de Clientes  
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
        <div className="flow-root">  
          <ul  
            role="list"  
            className="divide-y divide-gray-200 dark:divide-gray-700"  
          >  
            {clientes.map((cliente) => (  
              <CardClient key={cliente.idCliente} cliente={cliente} />  
            ))}  
          </ul>  
        </div>  
      </div>  
    );  
  } catch (error) {  
    console.error("Error fetching clientes:", error);  
    return <p>Error cargando clientes.</p>;  
  }  
}  