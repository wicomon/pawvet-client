// PM2 cluster config for pawvet-client (Next.js).
// Usage:
//   pnpm build
//   pm2 start ecosystem.config.cjs
//
// Session state is a stateless JWT stored in an httpOnly cookie (see
// src/lib/session.ts), so instances share no in-memory state and can scale
// horizontally without sticky sessions.
module.exports = {
  apps: [
    {
      name: "pawvet-client",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: "max",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
