import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Configuração independente da Lovable.
// - tanstackStart: SSR + roteamento por arquivos (src/routes)
// - nitro: gera a saída do servidor; na Vercel o preset "vercel" é detectado automaticamente
// - tsConfigPaths: alias "@/..." definido em tsconfig.json
export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Entrada do servidor em src/server.ts (wrapper de erros de SSR).
      server: { entry: "server" },
    }),
    nitro(),
    viteReact(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
