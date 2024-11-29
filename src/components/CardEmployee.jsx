export default function CardEmployee({ empleado }) {
  return (
    <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-5 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">
          {empleado.nombres} {empleado.apellidos}
        </h5>
        <a 
          href="#" 
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Editar
        </a>
      </div>
      
      {/* Employee Info */}
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-auto">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">DNI: </span>
                {empleado.dni}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Email: </span>
                {empleado.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Dirección: </span>
                {empleado.direccion}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Dirección: </span>
                {empleado.telefono}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}