import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Studentbevis",
        short_name: "Student",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icon.png", // Legg til et 192x192 bilde i public-mappen din senere
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
