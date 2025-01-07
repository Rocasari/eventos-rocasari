module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Redirige todas las solicitudes que comiencen con /api
        destination: "http://192.168.10.13:8080/api/:path*", // URL del backends
      },
    ];
  },
};
