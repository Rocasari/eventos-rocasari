module.exports = {
  apps: [{
    name: "eventos-rocasari",
    script: "npm",
    args: "start",
    log_date_format: "YYYY-MM-DD HH:mm:ss",
    error_file: "./logs/error.log",
    out_file: "./logs/access.log",
    merge_logs: true,
    env: {
      NODE_ENV: "production",
      LOG_LEVEL: "debug"
    }
  }]
}