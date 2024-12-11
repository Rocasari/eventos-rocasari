import EditDecoration from "@/components/EditDecoration";  
import Link from "next/link";  

export default async function EditarDecoracion({ params }) {  
  const { i: id } = params; // Obtiene el ID desde la URL dinámica  

  return (  
    <div className="p-6">  
      <div className="flex items-center space-x-4 mb-6 justify-center">  
        <Link href="/decoraciones">  
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
        </Link>  
        <h6 className="text-2xl font-bold text-gray-900 dark:text-gray-100">  
          Editar Decoración  
        </h6>  
      </div>  
      <EditDecoration id={id} />  
    </div>  
  );  
}