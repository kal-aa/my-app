import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd());
  // base: env.VITE_PUBLIC_URL || "/",

  return {
    plugins: [react()],
    base: "/my-app/",
    publicDir: "public",
    server: { port: 3000 },
  };
});
