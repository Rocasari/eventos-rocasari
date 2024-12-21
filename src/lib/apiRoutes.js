const BASE_URL = "http://192.168.10.13:8080/api";

export const apiRoutes = {
  // Rutas relacionadas con "decoraciones"
  decoraciones: {
    getAll: () => `${BASE_URL}/decoraciones`,
    getById: (id) => `${BASE_URL}/decoraciones/${id}`,
    create: () => `${BASE_URL}/decoraciones`, // POST sin ID
    update: (id) => `${BASE_URL}/decoraciones/${id}`, // PUT o PATCH
    delete: (id) => `${BASE_URL}/decoraciones/${id}`, // DELETE
  },

  // Rutas relacionadas con "locales"
  locales: {
    getAll: () => `${BASE_URL}/locales`,
    getById: (id) => `${BASE_URL}/locales/${id}`,
    create: () => `${BASE_URL}/locales`, // POST sin ID
    update: (id) => `${BASE_URL}/locales/${id}`, // PUT o PATCH
    delete: (id) => `${BASE_URL}/locales/${id}`, // DELETE
  },

  // Rutas relacionadas con "eventos"
  eventos: {
    getAll: () => `${BASE_URL}/eventos`,
    getById: (id) => `${BASE_URL}/eventos/${id}`,
    create: () => `${BASE_URL}/eventos`, // POST sin ID
    update: (id) => `${BASE_URL}/eventos/${id}`, // PUT o PATCH
    delete: (id) => `${BASE_URL}/eventos/${id}`, // DELETE
  },

  // Rutas relacionadas con "clientes"
  clientes: {
    getAll: () => `${BASE_URL}/clientes`,
    getById: (id) => `${BASE_URL}/clientes/${id}`,
    create: () => `${BASE_URL}/clientes`, // POST sin ID
    update: (id) => `${BASE_URL}/clientes/${id}`, // PUT o PATCH
    delete: (id) => `${BASE_URL}/clientes/${id}`, // DELETE
  },

  // Rutas relacionadas con "empleados"
  empleados: {
    getAll: () => `${BASE_URL}/empleados`,
    getById: (id) => `${BASE_URL}/empleados/${id}`,
    create: () => `${BASE_URL}/empleados`, // POST sin ID
    update: (id) => `${BASE_URL}/empleados/${id}`, // PUT o PATCH
    delete: (id) => `${BASE_URL}/empleados/${id}`, // DELETE
  },
};