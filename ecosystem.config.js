module.exports = {
  apps: [
    {
      name: "eventos-rocasari",
      script: "npm",
      args: "start",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "~/.pm2/logs/eventos-rocasari-error.log", // Logs de error.
      out_file: "~/.pm2/logs/eventos-rocasari-out.log",     // Logs estándar.
      merge_logs: true, // Combina logs si se usa clustering.
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
