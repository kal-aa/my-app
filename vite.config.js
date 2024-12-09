import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log('VITE_PUBLIC_URL:', import.meta.env.VITE_PUBLIC_URL);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: import.meta.env.VITE_PUBLIC_URL || '/',
  publicDir: "public",
  server: {
    port: 3000,
  },
});
