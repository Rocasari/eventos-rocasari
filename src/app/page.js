import Image from "next/image";

export default function Home() {
  console.log(`[PAGE LOG] Página principal cargada: ${new Date().toISOString()}`);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-8 gap-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <h1 className="text-3xl font-bold text-center">Bienvenido a Eventos GRUPO 7</h1>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <a
            className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-full h-96"
            href="/locales"
          >
            <img
              className="h-48 w-full rounded-t-lg object-cover"
              src="/locales.jpg"
              alt="Locales"
            />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium">Locales</h5>
              <p className="mb-4 text-base">
                Explora nuestros locales disponibles para tus eventos.
              </p>
            </div>
          </a>

          <a
            className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-full h-96"
            href="/empleados"
          >
            <img
              className="h-48 w-full rounded-t-lg object-cover"
              src="/empleados.jpg"
              alt="Empleados"
            />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium">Empleados</h5>
              <p className="mb-4 text-base">
                Conoce al equipo que hace posible nuestros eventos.
              </p>
            </div>
          </a>

          <a
            className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-full h-96"
            href="/clientes"
          >
            <img
              className="h-48 w-full rounded-t-lg object-cover"
              src="/clientes.jpg"
              alt="Clientes"
            />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium">Clientes</h5>
              <p className="mb-4 text-base">
                Descubre historias de nuestros clientes satisfechos.
              </p>
            </div>
          </a>

          <a
            className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-full h-96"
            href="/decoraciones"
          >
            <img
              className="h-48 w-full rounded-t-lg object-cover"
              src="/decoraciones.jpg"
              alt="Decoraciones"
            />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium">Decoraciones</h5>
              <p className="mb-4 text-base">
                Inspírate con nuestras decoraciones únicas.
              </p>
            </div>
          </a>

          <a
            className="flex flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white w-full h-96"
            href="/eventos"
          >
            <img
              className="h-48 w-full rounded-t-lg object-cover"
              src="/eventos.jpg"
              alt="Eventos"
            />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-xl font-medium">Eventos</h5>
              <p className="mb-4 text-base">
                Echa un vistazo a nuestros eventos recientes.
              </p>
            </div>
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Todos los derechos reservados
        </a>
      </footer>
    </div>
  );
}